import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { RequiredStar } from '@toolkit/components/required-star/required-star';
import { CurrencyCodeInput } from '@toolkit/components/currency-code-input/currency-code-input';

@Component({
	selector: 'gb-expense-currency-code',
	templateUrl: './expense-currency-code-input.html',
	imports: [ReactiveFormsModule, SelectModule, MessageModule, RequiredStar, CurrencyCodeInput],
})
export class ExpenseCurrencyCodeInput {
	readonly fc = input.required<FormControl<string>>();
}
