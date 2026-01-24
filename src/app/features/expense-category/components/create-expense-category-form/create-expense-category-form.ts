import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { CreateExpenseCategoryFormService } from '@features/expense-category/services/create-expense-category-form.service';
import { ExportCategoryNameInput } from '@features/expense-category/components/expense-category-name-input/expense-category-name-input';
import { ExpenseCategoryDescriptionInput } from '@features/expense-category/components/expense-category-description-textarea/expense-category-description-textarea';
import { ExpenseCategoryColorPicker } from '@features/expense-category/components/expense-category-color-picker/expense-category-color-picker';

@Component({
	selector: 'gb-create-expense-category-form',
	templateUrl: './create-expense-category-form.html',
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
	providers: [CreateExpenseCategoryFormService],
})
export class CreateExpenseCategoryForm {
	protected readonly formService = inject(CreateExpenseCategoryFormService);

	protected getFc(name: string) {
		return this.formService.form.get(name) as FormControl;
	}
}
