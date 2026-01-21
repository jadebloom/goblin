import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { CurrenciesTableService } from '@features/currencies/services/currencies-table.service';
import { UpdateCurrencyService } from '@features/currencies/services/update-currency.service';
import { Currency } from '@features/currencies/models/currency';

@Injectable({ providedIn: 'root' })
export class UpdateCurrencyFormService {
	readonly updateCurrencyService = inject(UpdateCurrencyService);
	private readonly currenciesTableService = inject(CurrenciesTableService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	readonly isUpdatingCurrency = signal(false);

	private currencyId?: number;

	readonly form = new FormGroup({
		name: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.maxLength(64)],
		}),
		alphabeticalCode: new FormControl('', {
			nonNullable: true,
			validators: [
				Validators.minLength(3),
				Validators.maxLength(3),
				Validators.pattern(/^[A-Z]{3}$/),
			],
		}),
	});

	loadInitialCurrency(currency: Currency) {
		this.currencyId = currency.id;

		this.form.get('name')?.setValue(currency.name ?? '');
		this.form.get('alphabeticalCode')?.setValue(currency.alphabetical_code ?? '');
	}

	updateCurrency() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		const currencyIdSnapshot = this.currencyId;
		if (currencyIdSnapshot == null) return;

		if (this.isUpdatingCurrency()) return;

		this.isUpdatingCurrency.set(true);

		const body = this.form.getRawValue();

		this.updateCurrencyService
			.updateCurrencyById(currencyIdSnapshot, {
				name: body.name,
				alphabetical_code: body.alphabeticalCode == '' ? null : body.alphabeticalCode,
			})
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isUpdatingCurrency.set(false)),
			)
			.subscribe({
				next: () => {
					this.currenciesTableService.loadCurrenciesInTable();

					this.messageService.add({
						severity: 'success',
						summary: 'Successfully updated the currency!',
						detail: 'Updated the currency with the ID=' + currencyIdSnapshot,
						key: 'main',
					});
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messageService.add({
						severity: 'error',
						summary: 'Failed to updated the currency with ID=' + currencyIdSnapshot,
						detail: detail,
						key: 'main',
					});
				},
			});
	}
}
