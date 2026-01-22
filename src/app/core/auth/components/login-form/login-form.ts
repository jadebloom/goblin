import { Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { EmailInput } from '@core/auth/components/email-input/email-input';
import { PasswordInput } from '@core/auth/components/password-input/password-input';
import { LoginFormService } from '@core/auth/services/login-form.service';

@Component({
	selector: 'gb-login-form',
	imports: [ReactiveFormsModule, ButtonModule, MessageModule, EmailInput, PasswordInput],
	templateUrl: './login-form.html',
	providers: [LoginFormService],
})
export class LoginForm {
	readonly formService = inject(LoginFormService);

	readonly email = computed(() => this.formService.form.get('email') as FormControl<string>);

	readonly password = computed(() => this.formService.form.get('password') as FormControl<string>);
}
