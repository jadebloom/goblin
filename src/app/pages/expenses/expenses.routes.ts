import { Routes } from '@angular/router';

export default [
	{
		path: 'expenses',
		children: [
			{
				title: 'Goblin. Expenses',
				path: '',
				loadComponent: () => import('./expenses-page').then((m) => m.ExpensesPage),
			},
			{
				title: 'Golbin. Expense Details',
				path: ':id',
				loadComponent: () =>
					import('./expense-details/expense-details').then((m) => m.ExpenseDetails),
			},
		],
	},
] as Routes;
