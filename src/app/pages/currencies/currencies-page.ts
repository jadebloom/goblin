import { Component } from '@angular/core';
import { CurrenciesToolbar } from '@features/currencies/components/currencies-toolbar/currencies-toolbar';
import { CurrenciesTable } from '@features/currencies/components/currencies-table/currencies-table';

@Component({
	selector: 'gb-currencies-page',
	templateUrl: './currencies-page.html',
	imports: [CurrenciesToolbar, CurrenciesTable],
})
export class CurrenciesPage {}
