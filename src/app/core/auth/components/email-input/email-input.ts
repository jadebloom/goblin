import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectOnFocusDirective } from '@toolkit/directives/select-on-focus.directive';

@Component({
	selector: 'gb-auth-email-input',
	imports: [ReactiveFormsModule, InputTextModule, MessageModule, SelectOnFocusDirective],
	templateUrl: './email-input.html',
})
export class EmailInput {
	email = input.required<FormControl<string>>();
}
