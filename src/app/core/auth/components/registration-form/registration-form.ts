import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { EmailInput } from '@core/auth/components/email-input/email-input';
import { PasswordInput } from '@core/auth/components/password-input/password-input';
import { AuthService } from '@core/auth/services/auth.service';
import { RegistrationPayload } from '@core/auth/models/registration-payload.model';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';

@Component({
	selector: 'gb-auth-registration-form',
	imports: [ReactiveFormsModule, EmailInput, PasswordInput, ButtonModule],
	templateUrl: './registration-form.html',
	styleUrl: './registration-form.less',
})
export class RegistrationForm {
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

	register() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		const body: RegistrationPayload = this.form.getRawValue();

		this.auth.register(body).subscribe({
			next: () => this.router.navigate(['/']),
			error: (err) => {
				const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

				this.messages.add({
					severity: 'error',
					summary: 'Registration Error',
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
