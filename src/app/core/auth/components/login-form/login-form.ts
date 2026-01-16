import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { EmailInput } from '@core/auth/components/email-input/email-input';
import { PasswordInput } from '@core/auth/components/password-input/password-input';
import { AuthService } from '@core/auth/services/auth.service';
import { LoginPayload } from '@core/auth/models/login-payload.model';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';

@Component({
	selector: 'gb-auth-login-form',
	imports: [ReactiveFormsModule, EmailInput, PasswordInput, ButtonModule],
	templateUrl: './login-form.html',
	styleUrl: './login-form.less',
})
export class LoginForm {
	readonly router = inject(Router);
	readonly messages = inject(MessageService);
	readonly auth = inject(AuthService);

	readonly form = new FormGroup({
		email: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.email, Validators.maxLength(64)],
		}),
		password: new FormControl('', {
			nonNullable: true,
			validators: [
				Validators.required,
				Validators.minLength(8),
				Validators.pattern(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!?_$#%^&*])[A-Za-z\d!?_$#%^&*]{8,}$/,
				),
				Validators.maxLength(32),
			],
		}),
	});

	login() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		const body: LoginPayload = this.form.getRawValue();

		this.auth.login(body).subscribe({
			next: () => this.router.navigate(['/']),
			error: (err) => {
				const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

				this.messages.add({
					severity: 'error',
					summary: 'Login Error',
					detail: detail,
					key: 'tc',
					life: 5000,
				});
			},
		});
	}

	email = computed(() => this.form.get('email') as FormControl<string>);

	password = computed(() => this.form.get('password') as FormControl<string>);
}
