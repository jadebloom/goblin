import { Component, inject } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CurrencyCreationModal } from '@features/currencies/components/currency-creation-modal/currency-creation-modal';
import { CurrencyCreationModalService } from '@features/currencies/services/currency-creation-modal.service';

@Component({
	selector: 'gb-currencies-page',
	templateUrl: './currencies-page.html',
	imports: [ToolbarModule, ButtonModule, CurrencyCreationModal],
})
export class CurrenciesPage {
	readonly currencyCreationModal = inject(CurrencyCreationModalService);
}
