import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { DeleteAllExpensesByCurrencyService } from '@features/currencies/services/delete-all-expenses-by-currency.service';
import { Currency } from '@features/currencies/models/currency';

@Component({
	selector: 'gb-currencies-delete-all-expenses-by-currency-confirm',
	templateUrl: './delete-all-expenses-by-currency-confirm.html',
	imports: [ButtonModule],
})
export class DeleteAllExpensesByCurrencyConfirm {
	private readonly deleteAllExpensesByCurrencyService = inject(DeleteAllExpensesByCurrencyService);
	private readonly messageService = inject(MessageService);
	private readonly dynamicDialogRef = inject(DynamicDialogRef);
	private readonly destroyRef = inject(DestroyRef);

	readonly currency = input.required<Currency>();

	protected readonly areExpensesDeleting = signal(false);

	deleteAllExpensesByCurrency() {
		const currencyId = this.currency().id;
		if (currencyId == null) return;

		if (this.areExpensesDeleting()) return;

		this.areExpensesDeleting.set(true);

		this.deleteAllExpensesByCurrencyService
			.deleteAllExpensesByTheirCurrencyId(currencyId)
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.areExpensesDeleting.set(false)),
			)
			.subscribe({
				next: () => {
					this.messageService.add({
						severity: 'success',
						summary: 'Successfully deleted expenses!',
						detail: `Successfully deleted all expenses that used currency ${this.currency().name ?? ''}`,
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
