import { Routes } from '@angular/router';
import { NotFoundPage } from '@pages/not-found';

export const routes: Routes = [
	{
		title: 'Goblin. Page not found',
		path: 'not-found',
		component: NotFoundPage,
	},
	{
		path: '**',
		redirectTo: 'not-found',
	},
];
