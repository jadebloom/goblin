import { Component, inject, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CurrencyUpdateFormService } from '@features/currencies/services/currency-update-form.service';
import { Currency } from '@features/currencies/models/currency';
import { RequiredStar } from '@toolkit/components/required-star/required-star';

@Component({
	selector: 'gb-currencies-currency-update-form',
	templateUrl: './currency-update-form.html',
	imports: [
		ReactiveFormsModule,
		DialogModule,
		InputTextModule,
		MessageModule,
		ButtonModule,
		RequiredStar,
	],
})
export class CurrencyUpdateForm {
	readonly formService = inject(CurrencyUpdateFormService);

	readonly initialCurrency = input.required<Currency>();

	ngOnInit() {
		this.formService.initialCurrency.set(this.initialCurrency());
	}
}
