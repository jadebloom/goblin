import { Routes } from '@angular/router';
import { LoginPage } from '@pages/login/login-page';
import { OverviewPage } from '@pages/overview/overview-page';
import { NotFoundPage } from '@pages/not-found/not-found-page';
import { RegistrationPage } from '@pages/registration/registration-page';
import { authGuard } from '@core/auth/guards/auth.guard';

export const routes: Routes = [
	{
		title: 'Goblin. Overview',
		path: '',
		component: OverviewPage,
		canActivate: [authGuard],
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
