import { Routes } from '@angular/router';
import { CurrenciesPage } from '@pages/currencies/currencies-page';

export default [
	{
		title: 'Goblin. Your currencies',
		path: 'currencies',
		component: CurrenciesPage,
	},
] as Routes;
