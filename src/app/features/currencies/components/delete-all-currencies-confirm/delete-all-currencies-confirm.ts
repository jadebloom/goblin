import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { CurrenciesTableService } from '@features/currencies/services/currencies-table.service';
import { DeleteAllCurrenciesService } from '@features/currencies/services/delete-all-currencies.service';

@Component({
	selector: 'gb-currencies-delete-all-currencies-confirm',
	templateUrl: './delete-all-currencies-confirm.html',
	imports: [ButtonModule],
})
export class DeleteAllCurrenciesConfirm {
	private readonly deleteAllCurrenciesService = inject(DeleteAllCurrenciesService);
	private readonly currenciesTableService = inject(CurrenciesTableService);
	private readonly messageService = inject(MessageService);
	private readonly dynamicDialogRef = inject(DynamicDialogRef);
	private readonly destroyRef = inject(DestroyRef);

	protected readonly areCurrenciesDeleting = signal(false);

	deleteAllCurrencies() {
		if (this.areCurrenciesDeleting()) return;

		this.areCurrenciesDeleting.set(true);

		this.deleteAllCurrenciesService
			.deleteAllCurrencies()
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.areCurrenciesDeleting.set(false)),
			)
			.subscribe({
				next: () => {
					this.currenciesTableService.loadCurrenciesInTable();

					this.messageService.add({
						severity: 'success',
						summary: 'Successfully deleted all currencies!',
						detail: 'Successfully deleted all currencies, regardless of their count',
						key: 'main',
					});

					this.dynamicDialogRef.close();
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messageService.add({
						severity: 'error',
						summary: 'Failed to delete all currencies',
						detail: detail,
						key: 'main',
					});
				},
			});
	}
}
