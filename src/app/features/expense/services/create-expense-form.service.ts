import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { CreateExpenseService } from '@features/expense/services/create-expense.service';
import { PaginatedExpensesService } from '@features/expense/services/paginated-expenses.service';
import { forbiddenAmountValidator } from '@features/expense/validators/forbidden-amout.validator';

@Injectable()
export class CreateExpenseFormService {
	private readonly createExpenseService = inject(CreateExpenseService);
	private readonly paginatedExpenseService = inject(PaginatedExpensesService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

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
		expenseCategoryId: new FormControl(null, {
			validators: [Validators.required],
		}),
		description: new FormControl('', {
			nonNullable: true,
			validators: [Validators.maxLength(256)],
		}),
		labels: new FormControl([], {
			nonNullable: true,
			validators: [Validators.maxLength(16)],
		}),
	});

	readonly isCreatingExpense = signal(false);

	createExpense() {
		const body = this.form.getRawValue();

		if (this.form.invalid || body.expenseCategoryId == null) {
			this.form.markAllAsTouched();

			return;
		}

		if (this.isCreatingExpense()) return;

		this.isCreatingExpense.set(true);

		this.createExpenseService
			.createExpense({
				name: body.name,
				description: body.description,
				amount: body.amount,
				currency_code: body.currencyCode,
				expense_category_id: body.expenseCategoryId,
				labels: body.labels,
			})
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isCreatingExpense.set(false)),
			)
			.subscribe({
				next: (res) => {
					this.paginatedExpenseService.loadExpenses();

					this.form.reset();

					this.messageService.add({
						severity: 'success',
						summary: 'Successfully created new expense!',
						detail: 'Created expense category with name=' + res.name,
						key: 'main',
					});
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messageService.add({
						severity: 'error',
						summary: 'Failed to create new expense',
						detail: detail,
						key: 'main',
					});
				},
			});
	}
}
