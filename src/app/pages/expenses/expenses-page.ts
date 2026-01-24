import { Component } from '@angular/core';
import { ExpensesToolbar } from '@features/expense/components/expenses-toolbar/expenses-toolbar';
import { ExpensesTable } from '@features/expense/components/expenses-table/expenses-table';

@Component({
	selector: 'gb-expenses-page',
	templateUrl: './expenses-page.html',
	imports: [ExpensesToolbar, ExpensesTable],
})
export class ExpensesPage {}
