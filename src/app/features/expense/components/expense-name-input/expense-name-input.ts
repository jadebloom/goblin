import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { RequiredStar } from '@toolkit/components/required-star/required-star';

@Component({
	selector: 'gb-expense-name-input',
	templateUrl: './expense-name-input.html',
	imports: [ReactiveFormsModule, InputTextModule, MessageModule, RequiredStar],
})
export class ExpenseNameInput {
	readonly fc = input.required<FormControl<string>>();
}
