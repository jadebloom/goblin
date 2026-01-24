import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenAmountValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = Number(control.value);

		if (!Number.isFinite(value) || value <= 0) {
			return { forbiddenAmount: true };
		}

		return null;
	};
}
