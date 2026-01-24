import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { RequiredStar } from '@toolkit/components/required-star/required-star';

@Component({
	selector: 'gb-expense-amount-input',
	templateUrl: './expense-amount-input.html',
	imports: [ReactiveFormsModule, InputNumberModule, MessageModule, RequiredStar],
})
export class ExpenseAmountInput {
	readonly fc = input.required<FormControl<number>>();
	readonly currencyCode = input.required<string>();
}
