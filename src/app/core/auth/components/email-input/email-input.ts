import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { RequiredStar } from '@toolkit/components/required-star/required-star';

@Component({
	selector: 'gb-email-input',
	imports: [ReactiveFormsModule, InputTextModule, MessageModule, RequiredStar],
	templateUrl: './email-input.html',
})
export class EmailInput {
	email = input.required<FormControl<string>>();
}
