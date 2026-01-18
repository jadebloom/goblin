import { Routes } from '@angular/router';
import { RegistrationPage } from '@pages/auth/registration/registration-page';
import { LoginPage } from '@pages/auth/login/login-page';

export default [
	{
		path: 'auth',
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
