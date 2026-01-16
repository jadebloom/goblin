import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginForm } from '@core/auth/components/login-form/login-form';

@Component({
	selector: 'gb-login-page',
	imports: [LoginForm, RouterLink],
	templateUrl: './login-page.html',
	styleUrl: './login-page.less',
})
export class LoginPage {}
