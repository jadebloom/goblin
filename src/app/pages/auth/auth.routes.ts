import { Routes } from '@angular/router';
import { RegistrationPage } from '@pages/auth/registration/registration-page';
import { LoginPage } from '@pages/auth/login/login-page';
import { MainLayout } from '@core/layout/components/main-layout/main-layout';

export default [
	{
		path: 'auth',
		component: MainLayout,
		children: [
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
		],
	},
] as Routes;
