import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { RegistrationFormService } from '@core/auth/services/registration-form.service';
import { EmailInput } from '@core/auth/components/email-input/email-input';
import { PasswordInput } from '@core/auth/components/password-input/password-input';

@Component({
	selector: 'gb-auth-registration-form',
	imports: [ReactiveFormsModule, ButtonModule, MessageModule, EmailInput, PasswordInput],
	templateUrl: './registration-form.html',
	providers: [RegistrationFormService],
})
export class RegistrationForm {
	readonly form = inject(RegistrationFormService);
}
