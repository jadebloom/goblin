import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { CreateExpenseCategoryService } from '@features/expense-category/services/create-expense-category.service';
import { ExpenseCategoriesTableService } from '@features/expense-category/services/expense-categories-table.service';

@Injectable({ providedIn: 'root' })
export class CreateExpenseCategoryFormService {
	private readonly createExpenseCategoryService = inject(CreateExpenseCategoryService);
	private readonly expenseCategoriesTableService = inject(ExpenseCategoriesTableService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

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

	readonly isCreatingExpenseCategory = signal(false);

	createExpenseCategory() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		if (this.isCreatingExpenseCategory()) return;

		this.isCreatingExpenseCategory.set(true);

		const body = this.form.getRawValue();

		this.createExpenseCategoryService
			.createExpenseCategory({
				name: body.name,
				description: body.description,
				hex_color_code: body.hexColorCode,
			})
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isCreatingExpenseCategory.set(false)),
			)
			.subscribe({
				next: (res) => {
					this.expenseCategoriesTableService.loadExpenseCategoriesInTable();

					this.form.reset();

					this.messageService.add({
						severity: 'success',
						summary: 'Successfully created new expense category!',
						detail: 'Created expense category with name=' + res.name,
						key: 'main',
					});
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messageService.add({
						severity: 'error',
						summary: 'Failed to create new expense category',
						detail: detail,
						key: 'main',
					});
				},
			});
	}
}
