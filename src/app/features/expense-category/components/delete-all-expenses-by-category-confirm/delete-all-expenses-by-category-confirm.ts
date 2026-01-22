import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { DeleteAllExpensesByExpenseCategoryService } from '@features/expense-category/services/delete-all-expenses-by-expense-category.service';
import { ExpenseCategory } from '@features/expense-category/models/expense-category';

@Component({
	selector: 'gb-delete-all-expenses-by-category-confirm',
	templateUrl: './delete-all-expenses-by-category-confirm.html',
	imports: [ButtonModule],
})
export class DeleteAllExpensesByCategoryConfirm {
	private readonly deleteAllExpensesByCategoryService = inject(
		DeleteAllExpensesByExpenseCategoryService,
	);
	private readonly messageService = inject(MessageService);
	private readonly dynamicDialogRef = inject(DynamicDialogRef);
	private readonly destroyRef = inject(DestroyRef);

	readonly expenseCategory = input.required<ExpenseCategory>();

	protected readonly areExpensesDeleting = signal(false);

	protected deleteAllExpensesByCategory() {
		if (this.areExpensesDeleting()) return;

		this.areExpensesDeleting.set(true);

		const expenseCategoryId = this.expenseCategory().id;

		if (expenseCategoryId == null) return;

		this.deleteAllExpensesByCategoryService
			.deleteAllExpensesByTheirExpenseCategoryId(expenseCategoryId)
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.areExpensesDeleting.set(false)),
			)
			.subscribe({
				next: () => {
					this.messageService.add({
						severity: 'success',
						summary: 'Successfully deleted expenses!',
						detail: `Successfully deleted all expenses that used category ${this.expenseCategory().name ?? ''}`,
						key: 'main',
					});

					this.dynamicDialogRef.close();
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messageService.add({
						severity: 'error',
						summary: 'Failed to delete expenses',
						detail: detail,
						key: 'main',
					});
				},
			});
	}
}
