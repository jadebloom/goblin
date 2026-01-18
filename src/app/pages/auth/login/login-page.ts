import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginForm } from '@core/auth/components/login-form/login-form';

@Component({
	selector: 'gb-login-page',
	imports: [LoginForm, RouterLink],
	templateUrl: './login-page.html',
	host: {
		class: 'flex flex-col flex-1 justify-center',
	},
})
export class LoginPage {}
