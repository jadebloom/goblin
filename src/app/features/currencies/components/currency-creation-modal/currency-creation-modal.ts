import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CurrencyCreationModalService } from '@features/currencies/services/currency-creation-modal.service';
import { RequiredStar } from '@toolkit/components/required-star/required-star';

@Component({
	selector: 'gb-currencies-currency-creation-modal',
	templateUrl: './currency-creation-modal.html',
	imports: [
		ReactiveFormsModule,
		DialogModule,
		InputTextModule,
		MessageModule,
		ButtonModule,
		RequiredStar,
	],
})
export class CurrencyCreationModal {
	readonly modal = inject(CurrencyCreationModalService);
}
