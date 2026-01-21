import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CreateCurrencyFormService } from '@features/currencies/services/create-currency-form.service';
import { RequiredStar } from '@toolkit/components/required-star/required-star';

@Component({
	selector: 'gb-currencies-create-currency-form',
	templateUrl: './create-currency-form.html',
	imports: [
		ReactiveFormsModule,
		DialogModule,
		InputTextModule,
		MessageModule,
		ButtonModule,
		RequiredStar,
	],
})
export class CreateCurrencyForm {
	protected readonly formService = inject(CreateCurrencyFormService);
}
