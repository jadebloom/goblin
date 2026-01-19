import { Component, inject } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CurrencyCreationModalService } from '@features/currencies/services/currency-creation-modal.service';

@Component({
	selector: 'gb-currencies-currencies-toolbar',
	templateUrl: './currencies-toolbar.html',
	imports: [ToolbarModule, ButtonModule],
})
export class CurrenciesToolbar {
	readonly currencyCreationModal = inject(CurrencyCreationModalService);
}
