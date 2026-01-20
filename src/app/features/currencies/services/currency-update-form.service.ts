import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { CurrenciesTableService } from '@features/currencies/services/currencies-table.service';
import { CurrencyUpdateService } from '@features/currencies/services/currency-update.service';
import { Currency } from '../models/currency';

@Injectable({ providedIn: 'root' })
export class CurrencyUpdateFormService {
	readonly updateService = inject(CurrencyUpdateService);
	private readonly tableService = inject(CurrenciesTableService);
	private readonly messagesService = inject(MessageService);

	readonly initialCurrency = signal<Currency | null>(null);

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

	readonly name = computed(() => this.form.get('name') as FormControl<string>);

	readonly alphabeticalCode = computed(
		() => this.form.get('alphabeticalCode') as FormControl<string>,
	);

	constructor() {
		effect(() => {
			this.form.get('name')?.setValue(this.initialCurrency()?.name ?? '');
			this.form.get('alphabeticalCode')?.setValue(this.initialCurrency()?.alphabetical_code ?? '');
		});
	}

	update() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		const currencyId = this.initialCurrency()?.id;

		if (currencyId == null) return;

		const body = this.form.getRawValue();

		this.updateService
			.update(currencyId, {
				name: body.name,
				alphabetical_code: body.alphabeticalCode == '' ? null : body.alphabeticalCode,
			})
			.subscribe({
				next: (res) => {
					this.tableService.load();

					this.initialCurrency.set(res);

					this.form.reset();

					this.messagesService.add({
						severity: 'success',
						summary: 'Successfully updated the currency!',
						detail: 'Updated the currency with the ID=' + currencyId,
						key: 'main',
					});
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messagesService.add({
						severity: 'error',
						summary: 'Failed to updated the currency with ID=' + currencyId,
						detail: detail,
						key: 'main',
					});
				},
			});
	}
}
