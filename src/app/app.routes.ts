import { Routes } from '@angular/router';
import { NotFoundPage } from '@pages/not-found/not-found-page';

export const routes: Routes = [
	// {
	// 	title: 'Goblin. Registration',
	// 	path: 'registration',
	// 	component: RegistrationPage,
	// },
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
