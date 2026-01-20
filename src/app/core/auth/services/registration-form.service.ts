import { inject, Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { AuthService } from '@core/auth/services/auth.service';
import { RegistrationPayload } from '@core/auth/models/registration-payload.model';

@Injectable()
export class RegistrationFormService {
	readonly auth = inject(AuthService);
	private readonly router = inject(Router);
	private readonly messages = inject(MessageService);

	readonly form = new FormGroup(
		{
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
			rePassword: new FormControl('', {
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
		},
		{ validators: passwordsMatchValidator },
	);

	register() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		const body: RegistrationPayload = this.form.getRawValue();

		this.auth
			.register({
				email: body.email,
				password: body.password,
			})
			.subscribe({
				next: () => this.router.navigate(['/']),
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messages.add({
						severity: 'error',
						summary: 'Failed to register',
						detail: detail,
						key: 'main',
					});
				},
			});
	}
}

export const passwordsMatchValidator: ValidatorFn = (group: AbstractControl) => {
	const password = group.get('password')?.value;
	const rePassword = group.get('rePassword')?.value;

	return password === rePassword ? null : { passwordMismatch: true };
};
