import { Component } from '@angular/core';
import { RegistrationForm } from '@core/auth/components/registration-form/registration-form';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'gb-registration-page',
	imports: [RegistrationForm, RouterLink],
	templateUrl: './registration-page.html',
	styleUrl: './registration-page.less',
})
export class RegistrationPage {}
