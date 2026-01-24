import { Routes } from '@angular/router';

export default [
	{
		path: 'expenses/categories',
		children: [
			{
				title: 'Goblin. Your expense categories',
				path: '',
				loadComponent: () =>
					import('./expense-categories-page').then((m) => m.ExpenseCategoriesPage),
			},
			{
				title: 'Goblin. Your expense category',
				path: ':id',
				loadComponent: () =>
					import('./expense-category-details/expense-category-details-page').then(
						(m) => m.ExpenseCategoriesDetailsPage,
					),
			},
		],
	},
] as Routes;
