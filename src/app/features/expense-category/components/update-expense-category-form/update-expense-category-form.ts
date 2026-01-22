import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { UpdateExpenseCategoryFormService } from '@features/expense-category/services/update-expense-category-form.service';
import { ExpenseCategory } from '@features/expense-category/models/expense-category';
import { RequiredStar } from '@toolkit/components/required-star/required-star';

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
		RequiredStar,
	],
})
export class UpdateExpenseCategoryForm implements OnInit {
	protected readonly formService = inject(UpdateExpenseCategoryFormService);

	readonly expenseCategory = input.required<ExpenseCategory>();

	protected readonly isColorPickerPanelShown = signal(false);

	ngOnInit(): void {
		const init = this.expenseCategory();

		this.formService.loadInitialExpenseCategory(init);
	}
}
