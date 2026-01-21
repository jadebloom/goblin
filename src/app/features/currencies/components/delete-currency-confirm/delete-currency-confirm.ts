import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { DeleteCurrencyService } from '@features/currencies/services/delete-currency.service';
import { CurrenciesTableService } from '@features/currencies/services/currencies-table.service';
import { Currency } from '@features/currencies/models/currency';

@Component({
	selector: 'gb-currencies-delete-currency-confirm',
	templateUrl: './delete-currency-confirm.html',
	imports: [ButtonModule],
})
export class DeleteCurrencyConfirm {
	private readonly deleteCurrencyService = inject(DeleteCurrencyService);
	private readonly currenciesTableService = inject(CurrenciesTableService);
	private readonly router = inject(Router);
	private readonly messageService = inject(MessageService);
	private readonly dynamicDialogRef = inject(DynamicDialogRef);
	private readonly destroyRef = inject(DestroyRef);

	readonly currency = input.required<Currency>();

	readonly isCurrencyDeleting = signal(false);
	readonly isCurrencyDeleted = signal(false);

	deleteCurrency() {
		const currencyId = this.currency().id;
		if (currencyId == null) return;

		if (this.isCurrencyDeleting() || this.isCurrencyDeleted()) return;

		this.isCurrencyDeleting.set(true);

		this.deleteCurrencyService
			.deleteCurrencyById(currencyId)
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isCurrencyDeleting.set(false)),
			)
			.subscribe({
				next: () => {
					this.isCurrencyDeleted.set(true);

					this.currenciesTableService.loadCurrenciesInTable();

					this.messageService.add({
						severity: 'success',
						summary: 'Successful deletion!',
						detail: 'Successfully deleted the currency with ID=' + currencyId,
						key: 'main',
					});

					this.dynamicDialogRef.close();

					this.router.navigate(['/currencies']);
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;
					this.messageService.add({
						severity: 'error',
						summary: 'Failed to delete the currency with ID=' + currencyId,
						detail: detail,
						key: 'main',
					});
				},
			});
	}
}
