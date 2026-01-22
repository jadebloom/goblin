import { inject, Injectable, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { AuthService } from '@core/auth/services/auth.service';
import { RegistrationPayload } from '@core/auth/models/registration-payload.model';

@Injectable()
export class RegistrationFormService {
	readonly authService = inject(AuthService);
	private readonly router = inject(Router);
	private readonly messageService = inject(MessageService);

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

	readonly isRegistrationLoading = signal(false);

	register() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		if (this.isRegistrationLoading()) return;

		this.isRegistrationLoading.set(true);

		const body: RegistrationPayload = this.form.getRawValue();

		this.authService
			.register({
				email: body.email,
				password: body.password,
			})
			.pipe(finalize(() => this.isRegistrationLoading.set(false)))
			.subscribe({
				next: () => {
					this.router.navigate(['/']);
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messageService.add({
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
