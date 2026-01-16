import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { EmailInput } from '@core/auth/components/email-input/email-input';
import { PasswordInput } from '@core/auth/components/password-input/password-input';
import { LoginFormService } from '@core/auth/services/login-form.service';

@Component({
	selector: 'gb-auth-login-form',
	imports: [ReactiveFormsModule, ButtonModule, MessageModule, EmailInput, PasswordInput],
	templateUrl: './login-form.html',
	styleUrl: './login-form.less',
	providers: [LoginFormService],
})
export class LoginForm {
	readonly form = inject(LoginFormService);
}
