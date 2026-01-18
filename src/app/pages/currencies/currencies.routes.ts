import { Routes } from '@angular/router';

export default [
	{
		title: 'Goblin. Your currencies',
		path: 'currencies',
		children: [
			{
				title: 'Goblin. Create new currency',
				path: 'creation',
				loadComponent: () =>
					import('./creation/creation-page').then((m) => m.CurrenciesCreationPage),
			},
		],
	},
] as Routes;
