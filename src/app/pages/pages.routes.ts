import { Routes } from '@angular/router';
import { MainLayout } from '@core/layout/components/main-layout/main-layout';
import { HomePage } from '@pages/home/home-page';
import { NotFoundPage } from '@pages/not-found/not-found-page';
import authRoutes from '@pages/auth/auth.routes';
import currenciesRoutes from '@pages/currencies/currencies.routes';
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
			...currenciesRoutes,
		],
	},
	...authRoutes,
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
