import { Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { RequiredStar } from '@toolkit/components/required-star/required-star';
import { SelectOnFocusDirective } from '@toolkit/directives/select-on-focus.directive';

@Component({
	selector: 'gb-password-input',
	imports: [
		ReactiveFormsModule,
		InputTextModule,
		InputGroupModule,
		InputGroupAddonModule,
		ButtonModule,
		MessageModule,
		SelectOnFocusDirective,
		RequiredStar,
	],
	templateUrl: './password-input.html',
})
export class PasswordInput {
	password = input.required<FormControl<string>>();
	label = input('Password');
	name = input('password');
	minLength = input(8);
	maxLength = input(32);
	placeholder = input('Ex: MyValidPassword123!');

	isPasswordVisible = signal(false);

	togglePasswordVisibility() {
		this.isPasswordVisible.update((prev) => !prev);
	}
}
