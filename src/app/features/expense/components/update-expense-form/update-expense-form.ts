import { Component, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UpdateExpenseFormService } from '@features/expense/services/update-expense-form.service';
import { ExpenseNameInput } from '@features/expense/components/expense-name-input/expense-name-input';
import { ExpenseCurrencyCodeInput } from '@features/expense/components/expense-currency-code-input/expense-currency-code-input';
import { ExpenseAmountInput } from '@features/expense/components/expense-amount-input/expense-amount-input';
import { ExpenseCategorySelect } from '@features/expense-category/components/expense-category-select/expense-category-select';
import { ExpenseDescriptionTextarea } from '@features/expense/components/expense-description-textarea/expense-description-textarea';
import { ExpenseLabelsInput } from '@features/expense/components/expense-labels-input/expense-labels-input';
import { Expense } from '@features/expense/models/expense';

@Component({
	selector: 'gb-update-expense-form',
	templateUrl: './update-expense-form.html',
	imports: [
		ReactiveFormsModule,
		InputTextModule,
		ButtonModule,
		ExpenseNameInput,
		ExpenseCurrencyCodeInput,
		ExpenseAmountInput,
		ExpenseCategorySelect,
		ExpenseDescriptionTextarea,
		ExpenseLabelsInput,
	],
	providers: [UpdateExpenseFormService],
})
export class UpdateExpenseForm {
	protected readonly formService = inject(UpdateExpenseFormService);

	readonly expense = input.required<Expense>();

	ngOnInit(): void {
		const init = this.expense();

		this.formService.loadInitialExpense(init);
	}

	protected getFc(name: string) {
		return this.formService.form.get(name) as FormControl;
	}
}
