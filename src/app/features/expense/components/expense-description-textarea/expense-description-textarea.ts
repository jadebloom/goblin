import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';

@Component({
	selector: 'gb-expense-description-textarea',
	templateUrl: './expense-description-textarea.html',
	imports: [ReactiveFormsModule, TextareaModule, MessageModule],
})
export class ExpenseDescriptionTextarea {
	readonly fc = input.required<FormControl<string | undefined | null>>();
}
