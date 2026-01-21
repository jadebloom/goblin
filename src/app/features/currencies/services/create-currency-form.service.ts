import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { CreateCurrencyService } from '@features/currencies/services/create-currency.service';
import { CurrenciesTableService } from '@features/currencies/services/currencies-table.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class CreateCurrencyFormService {
	readonly createCurrencyService = inject(CreateCurrencyService);
	private readonly currenciesTableService = inject(CurrenciesTableService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

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

	readonly isCreatingCurrency = signal(false);

	createCurrency() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		if (this.isCreatingCurrency()) return;

		this.isCreatingCurrency.set(true);

		const body = this.form.getRawValue();

		this.createCurrencyService
			.createCurrency({
				name: body.name,
				alphabetical_code: body.alphabeticalCode == '' ? undefined : body.alphabeticalCode,
			})
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isCreatingCurrency.set(false)),
			)
			.subscribe({
				next: (res) => {
					this.currenciesTableService.loadCurrenciesInTable();

					this.form.reset();

					this.messageService.add({
						severity: 'success',
						summary: 'Successfully created new currency!',
						detail: 'Created currency with the name=' + res.name,
						key: 'main',
					});
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messageService.add({
						severity: 'error',
						summary: 'Failed to create new currency',
						detail: detail,
						key: 'main',
					});
				},
			});
	}
}
