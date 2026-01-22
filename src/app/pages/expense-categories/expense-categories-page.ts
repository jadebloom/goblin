import { Component } from '@angular/core';
import { ExpenseCategoriesToolbar } from '@features/expense-category/components/expense-categories-toolbar/expense-categories-toolbar';
import { ExpenseCategoriesTable } from '@features/expense-category/components/expense-categories-table/expense-categories-table';

@Component({
	selector: 'gb-expense-categories-page',
	templateUrl: './expense-categories-page.html',
	imports: [ExpenseCategoriesToolbar, ExpenseCategoriesTable],
})
export class ExpenseCategoriesPage {}
