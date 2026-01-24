import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { DeleteExpenseService } from '@features/expense/services/delete-expense.service';
import { PaginatedExpensesService } from '@features/expense/services/paginated-expenses.service';
import { Expense } from '@features/expense/models/expense';

@Component({
	selector: 'gb-delete-expense-confirm',
	templateUrl: './delete-expense-confirm.html',
	imports: [ButtonModule],
})
export class DeleteExpenseConfirm {
	private readonly deleteExpenseService = inject(DeleteExpenseService);
	private readonly paginatedExpensesService = inject(PaginatedExpensesService);
	private readonly router = inject(Router);
	private readonly messageService = inject(MessageService);
	private readonly dynamicDialogRef = inject(DynamicDialogRef);
	private readonly destroyRef = inject(DestroyRef);

	readonly expense = input.required<Expense>();

	readonly isExpenseDeleting = signal(false);
	readonly isExpenseDeleted = signal(false);

	protected deleteExpense() {
		const expenseId = this.expense().id;

		if (expenseId == null) return;

		if (this.isExpenseDeleting() || this.isExpenseDeleted()) return;

		this.isExpenseDeleting.set(true);

		this.deleteExpenseService
			.deleteExpenseById(expenseId)
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isExpenseDeleting.set(false)),
			)
			.subscribe({
				next: () => {
					this.isExpenseDeleted.set(true);

					this.paginatedExpensesService.loadExpenses();

					this.messageService.add({
						severity: 'success',
						summary: 'Successful deletion!',
						detail: `Successfully deleted the expense with ID ${expenseId}`,
						key: 'main',
					});

					this.dynamicDialogRef.close();

					this.router.navigate(['/expenses']);
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;
					this.messageService.add({
						severity: 'error',
						summary: `Failed to delete the expense with ID=${expenseId}`,
						detail: detail,
						key: 'main',
					});
				},
			});
	}
}
