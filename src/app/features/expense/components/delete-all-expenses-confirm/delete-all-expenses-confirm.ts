import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { DeleteAllExpensesService } from '@features/expense/services/delete-all-expenses.service';
import { PaginatedExpensesService } from '@features/expense/services/paginated-expenses.service';

@Component({
	selector: 'gb-delete-all-expenses-confirm',
	templateUrl: './delete-all-expenses-confirm.html',
	imports: [ButtonModule],
})
export class DeleteAllExpensesConfirm {
	private readonly deleteAllExpensesService = inject(DeleteAllExpensesService);
	private readonly paginatedExpensesService = inject(PaginatedExpensesService);
	private readonly messageService = inject(MessageService);
	private readonly dynamicDialogRef = inject(DynamicDialogRef);
	private readonly destroyRef = inject(DestroyRef);

	protected readonly areExpensesDeleting = signal(false);

	protected deleteAllExpenses() {
		if (this.areExpensesDeleting()) return;

		this.areExpensesDeleting.set(true);

		this.deleteAllExpensesService
			.deleteAllExpenses()
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.areExpensesDeleting.set(false)),
			)
			.subscribe({
				next: () => {
					this.paginatedExpensesService.loadExpenses();

					this.messageService.add({
						severity: 'success',
						summary: 'Successfully deleted all expenses!',
						detail: 'Successfully deleted all expenses!',
						key: 'main',
					});

					this.dynamicDialogRef.close();
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messageService.add({
						severity: 'error',
						summary: 'Failed to delete all expenses',
						detail: detail,
						key: 'main',
					});
				},
			});
	}
}
