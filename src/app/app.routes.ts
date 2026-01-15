import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/guards/auth.guard';
import { MainPage } from '@pages/main/main-page';
import { NotFoundPage } from '@pages/not-found/not-found-page';
import { RegistrationPage } from '@pages/registration/registration-page';

export const routes: Routes = [
	{
		title: 'Goblin. Main page',
		path: '',
		component: MainPage,
		canActivate: [authGuard],
		children: [],
	},
	{
		title: 'Goblin. Registration',
		path: 'registration',
		component: RegistrationPage,
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
