import { Component, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
	selector: 'gb-currency-code-input',
	templateUrl: './currency-code-input.html',
	imports: [ReactiveFormsModule, SelectModule, FormsModule],
})
export class CurrencyCodeInput {
	readonly fc = input.required<FormControl<string>>();
	readonly inputId = input.required<string>();
	readonly required = input.required<boolean>();

	protected options: Currency[] = [
		{
			name: 'USD',
			code: 'us',
		},
		{
			name: 'RUB',
			code: 'ru',
		},
		{
			name: 'KZT',
			code: 'kz',
		},
		{
			name: 'JPY',
			code: 'jp',
		},
	];
}

export interface Currency {
	name: string;
	code: string;
}
