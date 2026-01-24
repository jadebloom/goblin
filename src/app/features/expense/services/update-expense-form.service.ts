import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { forbiddenAmountValidator } from '@features/expense/validators/forbidden-amout.validator';
import { UpdateExpenseService } from '@features/expense/services/update-expense.service';
import { PaginatedExpensesService } from '@features/expense/services/paginated-expenses.service';
import { Expense } from '../models/expense';

@Injectable()
export class UpdateExpenseFormService {
	private readonly updateExpenseService = inject(UpdateExpenseService);
	private readonly paginatedExpenseService = inject(PaginatedExpensesService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	readonly expenseId = signal<number | null>(null);

	readonly isUpdatingExpense = signal(false);

	readonly form = new FormGroup({
		name: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.maxLength(64)],
		}),
		currencyCode: new FormControl('USD', {
			nonNullable: true,
			validators: [Validators.required, Validators.pattern('^[A-Z]{3}$')],
		}),
		amount: new FormControl(1, {
			nonNullable: true,
			validators: [Validators.required, forbiddenAmountValidator()],
		}),
		expenseCategoryId: new FormControl<number | null>(null, {
			validators: [Validators.required],
		}),
		description: new FormControl('', {
			nonNullable: true,
			validators: [Validators.maxLength(256)],
		}),
		labels: new FormControl<string[]>([], {
			nonNullable: true,
			validators: [Validators.maxLength(16)],
		}),
	});

	loadInitialExpense(init: Expense) {
		this.expenseId.set(init.id);

		this.form.get('name')?.setValue(init.name);
		this.form.get('currencyCode')?.setValue(init.currency_code);
		this.form.get('amount')?.setValue(init.amount);
		this.form.get('expenseCategoryId')?.setValue(init.expense_category_id);
		this.form.get('description')?.setValue(init.description ?? '');
		this.form.get('labels')?.setValue(init.labels ?? []);
	}

	updateExpense() {
		const expenseId = this.expenseId();

		if (expenseId == null) return;

		const payload = this.form.getRawValue();

		if (payload.expenseCategoryId == null) return;

		if (this.isUpdatingExpense()) return;

		this.isUpdatingExpense.set(true);

		this.updateExpenseService
			.updateExpense(expenseId, {
				name: payload.name,
				currency_code: payload.currencyCode,
				amount: payload.amount,
				expense_category_id: payload.expenseCategoryId,
				description: payload.description,
				labels: payload.labels,
			})
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isUpdatingExpense.set(false)),
			)
			.subscribe({
				next: () => {
					this.paginatedExpenseService.loadExpenses();

					this.messageService.add({
						severity: 'success',
						summary: 'Successfully updated the expense!',
						detail: 'Updated the expense with ID=' + expenseId,
						key: 'main',
					});
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messageService.add({
						severity: 'error',
						summary: 'Failed to updated the expense with ID=' + expenseId,
						detail: detail,
						key: 'main',
					});
				},
			});
	}
}
