import { ResolveFn, Routes } from '@angular/router';

const currencyDetailsTitleResolver: ResolveFn<string> = (route) =>
	'Goblin. ' + route.paramMap.get('name') + "'s details";

export default [
	{
		path: 'currencies',
		children: [
			{
				title: 'Goblin. Your currencies',
				path: '',
				loadComponent: () => import('./currencies-page').then((m) => m.CurrenciesPage),
			},
			{
				title: currencyDetailsTitleResolver,
				path: ':id',
				loadComponent: () =>
					import('./currency-details/currency-details').then((m) => m.CurrencyDetailsPage),
			},
		],
	},
] as Routes;
