import { Component, inject, input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { UpdateCurrencyFormService } from '@features/currencies/services/update-currency-form.service';
import { Currency } from '@features/currencies/models/currency';
import { RequiredStar } from '@toolkit/components/required-star/required-star';

@Component({
	selector: 'gb-currencies-update-currency-form',
	templateUrl: './update-currency-form.html',
	imports: [
		ReactiveFormsModule,
		DialogModule,
		InputTextModule,
		MessageModule,
		ButtonModule,
		RequiredStar,
	],
})
export class UpdateCurrencyForm implements OnInit {
	protected readonly formService = inject(UpdateCurrencyFormService);

	readonly currency = input.required<Currency>();

	ngOnInit(): void {
		const init = this.currency();

		this.formService.loadInitialCurrency(init);
	}
}
