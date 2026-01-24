import { Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
	selector: 'gb-expense-category-color-picker',
	templateUrl: './expense-category-color-picker.html',
	imports: [ReactiveFormsModule, ColorPickerModule],
})
export class ExpenseCategoryColorPicker {
	readonly fc = input.required<FormControl>();

	protected readonly isColorPickerExpanded = signal(false);
}
