import { Component, inject, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ExpenseCategoriesPaginatedService } from '@features/expense-category/services/expense-categories-paginated.service';
import { RequiredStar } from '@toolkit/components/required-star/required-star';

@Component({
	selector: 'gb-expense-category-select',
	templateUrl: './expense-category-select.html',
	imports: [ReactiveFormsModule, SelectModule, MessageModule, ButtonModule, RequiredStar],
})
export class ExpenseCategorySelect implements OnInit {
	protected readonly expenseCategoriesPaginatedService = inject(ExpenseCategoriesPaginatedService);

	readonly fc = input.required<FormControl<number | null>>();

	ngOnInit(): void {
		this.expenseCategoriesPaginatedService.loadExpenseCategories();
	}
}
