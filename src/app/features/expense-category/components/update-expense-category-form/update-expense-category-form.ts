import { Component, inject, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { UpdateExpenseCategoryFormService } from '@features/expense-category/services/update-expense-category-form.service';
import { ExportCategoryNameInput } from '@features/expense-category/components/expense-category-name-input/expense-category-name-input';
import { ExpenseCategoryDescriptionInput } from '@features/expense-category/components/expense-category-description-textarea/expense-category-description-textarea';
import { ExpenseCategoryColorPicker } from '@features/expense-category/components/expense-category-color-picker/expense-category-color-picker';
import { ExpenseCategory } from '@features/expense-category/models/expense-category';

@Component({
	selector: 'gb-update-expense-category-form',
	templateUrl: './update-expense-category-form.html',
	imports: [
		ReactiveFormsModule,
		DialogModule,
		InputTextModule,
		MessageModule,
		ButtonModule,
		ColorPickerModule,
		ExportCategoryNameInput,
		ExpenseCategoryDescriptionInput,
		ExpenseCategoryColorPicker,
	],
})
export class UpdateExpenseCategoryForm implements OnInit {
	protected readonly formService = inject(UpdateExpenseCategoryFormService);

	readonly expenseCategory = input.required<ExpenseCategory>();

	ngOnInit(): void {
		const init = this.expenseCategory();

		this.formService.loadInitialExpenseCategory(init);
	}

	protected getFc(name: string) {
		return this.formService.form.get(name) as FormControl;
	}
}
