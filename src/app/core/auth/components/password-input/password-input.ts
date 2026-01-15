import { Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { SelectOnFocusDirective } from '@toolkit/directives/select-on-focus.directive';

@Component({
	selector: 'gb-auth-password-input',
	imports: [
		ReactiveFormsModule,
		InputTextModule,
		InputGroupModule,
		InputGroupAddonModule,
		ButtonModule,
		MessageModule,
		SelectOnFocusDirective,
	],
	templateUrl: './password-input.html',
	styleUrl: './password-input.less',
})
export class PasswordInput {
	password = input.required<FormControl<string>>();

	isPasswordVisible = signal(false);

	togglePasswordVisibility() {
		this.isPasswordVisible.update((prev) => !prev);
	}
}
