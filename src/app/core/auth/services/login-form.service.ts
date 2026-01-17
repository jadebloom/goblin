import { computed, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { AuthService } from '@core/auth/services/auth.service';
import { LoginPayload } from '@core/auth/models/login-payload.model';

@Injectable()
export class LoginFormService {
	readonly auth = inject(AuthService);
	private readonly router = inject(Router);
	private readonly messages = inject(MessageService);

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

	readonly email = computed(() => this.form.get('email') as FormControl<string>);

	readonly password = computed(() => this.form.get('password') as FormControl<string>);

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
					key: 'tr',
					life: 5000,
				});
			},
		});
	}
}
