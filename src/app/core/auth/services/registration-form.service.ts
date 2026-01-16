import { computed, inject, Injectable } from '@angular/core';
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

	readonly email = computed(() => this.form.get('email') as FormControl<string>);

	readonly password = computed(() => this.form.get('password') as FormControl<string>);

	readonly rePassword = computed(() => this.form.get('rePassword') as FormControl<string>);

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
}

export const passwordsMatchValidator: ValidatorFn = (group: AbstractControl) => {
	const password = group.get('password')?.value;
	const rePassword = group.get('rePassword')?.value;

	return password === rePassword ? null : { passwordMismatch: true };
};
