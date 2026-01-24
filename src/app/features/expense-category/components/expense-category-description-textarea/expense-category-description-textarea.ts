import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';

@Component({
	selector: 'gb-expense-category-description-textarea',
	templateUrl: './expense-category-description-textarea.html',
	imports: [ReactiveFormsModule, TextareaModule, MessageModule],
})
export class ExpenseCategoryDescriptionInput {
	readonly fc = input.required<FormControl<string>>();
}
