import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { DeleteExpenseCategoryService } from '@features/expense-category/services/delete-expense-category.service';
import { ExpenseCategoriesPaginatedService } from '@features/expense-category/services/expense-categories-paginated.service';
import { ExpenseCategory } from '@features/expense-category/models/expense-category';

@Component({
	selector: 'gb-delete-expense-category-confirm',
	templateUrl: './delete-expense-category-confirm.html',
	imports: [ButtonModule],
})
export class DeleteExpenseCategoryConfirm {
	private readonly deleteExpenseCategoryService = inject(DeleteExpenseCategoryService);
	private readonly expenseCategoriesPaginatedService = inject(ExpenseCategoriesPaginatedService);
	private readonly router = inject(Router);
	private readonly messageService = inject(MessageService);
	private readonly dynamicDialogRef = inject(DynamicDialogRef);
	private readonly destroyRef = inject(DestroyRef);

	readonly expenseCategory = input.required<ExpenseCategory>();

	readonly isExpenseCategoryDeleting = signal(false);
	readonly isExpenseCategoryDeleted = signal(false);

	protected deleteExpenseCategory() {
		if (this.isExpenseCategoryDeleting() || this.isExpenseCategoryDeleted()) return;

		this.isExpenseCategoryDeleting.set(true);

		const expenseCategoryId = this.expenseCategory().id;

		if (expenseCategoryId == null) return;

		this.deleteExpenseCategoryService
			.deleteExpenseCategoryById(expenseCategoryId)
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isExpenseCategoryDeleting.set(false)),
			)
			.subscribe({
				next: () => {
					this.isExpenseCategoryDeleted.set(true);

					this.expenseCategoriesPaginatedService.loadExpenseCategories();

					this.messageService.add({
						severity: 'success',
						summary: 'Successful deletion!',
						detail: `Successfully deleted the expense category with ID=${expenseCategoryId}`,
						key: 'main',
					});

					this.dynamicDialogRef.close();

					this.router.navigate(['/expenses/categories']);
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;
					this.messageService.add({
						severity: 'error',
						summary: `Failed to delete the expense category with ID=${expenseCategoryId}`,
						detail: detail,
						key: 'main',
					});
				},
			});
	}
}
