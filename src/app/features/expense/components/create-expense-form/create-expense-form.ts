import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CreateExpenseFormService } from '@features/expense/services/create-expense-form.service';
import { ExpenseNameInput } from '@features/expense/components/expense-name-input/expense-name-input';
import { ExpenseDescriptionTextarea } from '@features/expense/components/expense-description-textarea/expense-description-textarea';
import { ExpenseCurrencyCodeInput } from '@features/expense/components/expense-currency-code-input/expense-currency-code-input';
import { ExpenseAmountInput } from '../expense-amount-input/expense-amount-input';
import { ExpenseCategorySelect } from '@features/expense-category/components/expense-category-select/expense-category-select';
import { ExpenseLabelsInput } from '../expense-labels-input/expense-labels-input';

@Component({
	selector: 'gb-create-expense-form',
	templateUrl: './create-expense-form.html',
	imports: [
		ReactiveFormsModule,
		DialogModule,
		InputTextModule,
		MessageModule,
		ButtonModule,
		ExpenseNameInput,
		ExpenseDescriptionTextarea,
		ExpenseCurrencyCodeInput,
		ExpenseAmountInput,
		ExpenseCategorySelect,
		ExpenseLabelsInput,
	],
	providers: [CreateExpenseFormService],
})
export class CreateExpenseForm {
	protected readonly formService = inject(CreateExpenseFormService);

	protected getFc(name: string) {
		return this.formService.form.get(name) as FormControl;
	}
}
