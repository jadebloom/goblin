import { computed, inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CurrenciesService } from '@features/currencies/services/currencies.service';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';

@Injectable({ providedIn: 'root' })
export class CurrencyCreationModalService {
	readonly currencies = inject(CurrenciesService);
	private readonly messages = inject(MessageService);

	readonly isModalOpened = signal(false);

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

	create() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		const body = this.form.getRawValue();

		this.currencies
			.create({
				name: body.name,
				alphabetical_code: body.alphabeticalCode == '' ? undefined : body.alphabeticalCode,
			})
			.subscribe({
				next: (res) => {
					this.form.reset();

					this.messages.add({
						severity: 'success',
						summary: 'Creation Success',
						detail: 'Created currency with the name "' + res.name + '".',
						key: 'tr',
						life: 5000,
					});
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messages.add({
						severity: 'error',
						summary: 'Creation Error',
						detail: detail,
						key: 'tr',
						life: 5000,
					});
				},
			});
	}

	open() {
		this.isModalOpened.set(true);
	}

	close() {
		this.isModalOpened.set(false);
	}
}
