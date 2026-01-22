import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { UpdateExpenseCategoryService } from '@features/expense-category/services/update-expense-category.service';
import { ExpenseCategoriesTableService } from '@features/expense-category/services/expense-categories-table.service';
import { ExpenseCategory } from '../models/expense-category';

@Injectable({ providedIn: 'root' })
export class UpdateExpenseCategoryFormService {
	private readonly updateExpenseCategoryService = inject(UpdateExpenseCategoryService);
	private readonly expenseCategoriesTableService = inject(ExpenseCategoriesTableService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	readonly isUpdatingExpenseCategory = signal(false);

	private expenseCategoryId?: number;

	readonly form = new FormGroup({
		name: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.maxLength(64)],
		}),
		description: new FormControl('', {
			validators: [Validators.maxLength(256)],
		}),
		hexColorCode: new FormControl('', {}),
	});

	loadInitialExpenseCategory(expenseCategory: ExpenseCategory) {
		this.expenseCategoryId = expenseCategory.id;

		this.form.get('name')?.setValue(expenseCategory.name ?? '');
		this.form.get('description')?.setValue(expenseCategory.description ?? '');
		this.form.get('hexColorCode')?.setValue(expenseCategory.hex_color_code ?? '');
	}

	updateExpenseCategory() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		if (this.isUpdatingExpenseCategory()) return;

		this.isUpdatingExpenseCategory.set(true);

		const expenseCategoryIdSnapshot = this.expenseCategoryId;

		if (expenseCategoryIdSnapshot == null) return;

		const body = this.form.getRawValue();

		this.updateExpenseCategoryService
			.updateExpenseCategoryById(expenseCategoryIdSnapshot, {
				name: body.name,
				description: body.description,
				hex_color_code: body.hexColorCode,
			})
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isUpdatingExpenseCategory.set(false)),
			)
			.subscribe({
				next: () => {
					this.expenseCategoriesTableService.loadExpenseCategoriesInTable();

					this.messageService.add({
						severity: 'success',
						summary: 'Successfully updated the expense category!',
						detail: 'Updated the expense category with ID=' + expenseCategoryIdSnapshot,
						key: 'main',
					});
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messageService.add({
						severity: 'error',
						summary: 'Failed to updated the expense category with ID=' + expenseCategoryIdSnapshot,
						detail: detail,
						key: 'main',
					});
				},
			});
	}
}
