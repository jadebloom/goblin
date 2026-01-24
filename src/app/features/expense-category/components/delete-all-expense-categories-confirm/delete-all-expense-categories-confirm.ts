import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { DeleteAllExpenseCategoriesService } from '@features/expense-category/services/delete-all-expense-categories.service';
import { ExpenseCategoriesPaginatedService } from '@features/expense-category/services/expense-categories-paginated.service';

@Component({
	selector: 'gb-delete-all-expense-categories-confirm',
	templateUrl: './delete-all-expense-categories-confirm.html',
	imports: [ButtonModule],
})
export class DeleteAllExpenseCategoriesConfirm {
	private readonly deleteAllExpenseCategoriesService = inject(DeleteAllExpenseCategoriesService);
	private readonly expenseCategoriesPaginatedService = inject(ExpenseCategoriesPaginatedService);
	private readonly messageService = inject(MessageService);
	private readonly dynamicDialogRef = inject(DynamicDialogRef);
	private readonly destroyRef = inject(DestroyRef);

	protected readonly areExpenseCategoriesDeleting = signal(false);

	protected deleteAllExpenseCategories() {
		if (this.areExpenseCategoriesDeleting()) return;

		this.areExpenseCategoriesDeleting.set(true);

		this.deleteAllExpenseCategoriesService
			.deleteAllExpenseCategories()
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.areExpenseCategoriesDeleting.set(false)),
			)
			.subscribe({
				next: () => {
					this.expenseCategoriesPaginatedService.loadExpenseCategories();

					this.messageService.add({
						severity: 'success',
						summary: 'Successfully deleted all expense categories!',
						detail: 'Successfully deleted all expense categories!',
						key: 'main',
					});

					this.dynamicDialogRef.close();
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messageService.add({
						severity: 'error',
						summary: 'Failed to delete all expense categories',
						detail: detail,
						key: 'main',
					});
				},
			});
	}
}
