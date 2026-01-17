import { Component } from '@angular/core';
import { RegistrationForm } from '@core/auth/components/registration-form/registration-form';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'gb-registration-page',
	imports: [RouterLink, RegistrationForm],
	templateUrl: './registration-page.html',
})
export class RegistrationPage {}
