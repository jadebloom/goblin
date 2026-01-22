import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { CreateExpenseCategoryFormService } from '@features/expense-category/services/create-expense-category-form.service';
import { RequiredStar } from '@toolkit/components/required-star/required-star';

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
		RequiredStar,
	],
})
export class CreateExpenseCategoryForm {
	protected readonly formService = inject(CreateExpenseCategoryFormService);

	protected readonly isColorPickerPanelShown = signal(false);
}
