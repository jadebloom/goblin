import { Routes } from '@angular/router';
import { LoginPage } from '@pages/login/login-page';
import { HomePage } from '@pages/home/home-page';
import { NotFoundPage } from '@pages/not-found/not-found-page';
import { RegistrationPage } from '@pages/registration/registration-page';

export const routes: Routes = [
	{
		title: 'Goblin. Home',
		path: '',
		component: HomePage,
		// FLAG
		// canActivate: [authGuard],
		children: [],
	},
	{
		title: 'Goblin. Registration',
		path: 'registration',
		component: RegistrationPage,
	},
	{
		title: 'Goblin. Login',
		path: 'login',
		component: LoginPage,
	},
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
