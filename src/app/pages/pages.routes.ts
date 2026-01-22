import { Routes } from '@angular/router';
import { HomePage } from '@pages/home/home-page';
import { RegistrationPage } from '@pages/registration/registration-page';
import { LoginPage } from '@pages/login/login-page';
import { NotFoundPage } from '@pages/not-found/not-found-page';
import expenseCategoriesRoutes from '@pages/expense-categories/expense-categories.routes';
import { MainLayout } from '@core/layout/components/main-layout/main-layout';
import { authGuard } from '@core/auth/guards/auth.guard';

export default [
	{
		path: '',
		component: MainLayout,
		canActivateChild: [authGuard],
		children: [
			{
				title: 'Goblin. Home',
				path: '',
				component: HomePage,
			},
			...expenseCategoriesRoutes,
		],
	},
	{
		path: 'registration',
		component: MainLayout,
		children: [
			{
				title: 'Goblin. Registration',
				path: '',
				component: RegistrationPage,
			},
		],
	},
	{
		path: 'login',
		component: MainLayout,
		children: [
			{
				title: 'Goblin. Login',
				path: '',
				component: LoginPage,
			},
		],
	},
	{
		path: 'not-found',
		component: MainLayout,
		children: [
			{
				title: 'Goblin. Page not found',
				path: '',
				component: NotFoundPage,
			},
		],
	},
	{
		path: '**',
		redirectTo: 'not-found',
	},
] as Routes;
