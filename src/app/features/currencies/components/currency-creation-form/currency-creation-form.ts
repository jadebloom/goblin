import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CurrencyCreationFormService } from '@features/currencies/services/currency-creation-form.service';
import { RequiredStar } from '@toolkit/components/required-star/required-star';

@Component({
	selector: 'gb-currencies-currency-creation-form',
	templateUrl: './currency-creation-form.html',
	imports: [
		ReactiveFormsModule,
		DialogModule,
		InputTextModule,
		MessageModule,
		ButtonModule,
		RequiredStar,
	],
})
export class CurrencyCreationForm {
	readonly formService = inject(CurrencyCreationFormService);
}
