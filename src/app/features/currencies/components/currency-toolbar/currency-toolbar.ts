import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { DeleteCurrencyConfirm } from '@features/currencies/components/delete-currency-confirm/delete-currency-confirm';
import { DeleteAllExpensesByCurrencyConfirm } from '@features/currencies/components/delete-all-expenses-by-currency-confirm/delete-all-expenses-by-currency-confirm';
import { Currency } from '@features/currencies/models/currency';

@Component({
	selector: 'gb-currencies-currency-toolbar',
	templateUrl: './currency-toolbar.html',
	imports: [ToolbarModule, ButtonModule],
	providers: [DialogService],
})
export class CurrencyToolbar {
	private readonly router = inject(Router);
	private readonly dialogService = inject(DialogService);

	readonly currency = input.required<Currency>();

	private dialogRef?: DynamicDialogRef | null;

	navigateToCurrenciesPage() {
		this.router.navigate(['/currencies']);
	}

	openCurrencyDeletionDialog(event: Event) {
		event.stopPropagation();

		this.dialogRef = this.dialogService.open(DeleteCurrencyConfirm, {
			header: 'Deleting currency',
			inputValues: {
				currency: this.currency(),
			},
			width: '24rem',
			breakpoints: {
				'768px': '90%',
			},
			baseZIndex: 10000,
			closable: true,
		});
	}

	openExpensesDeletionDialog(event: Event) {
		event.stopPropagation();

		this.dialogRef = this.dialogService.open(DeleteAllExpensesByCurrencyConfirm, {
			header: 'Deleting all expenses that use this currency',
			inputValues: {
				currency: this.currency(),
			},
			width: '24rem',
			breakpoints: {
				'768px': '90%',
			},
			baseZIndex: 10000,
			closable: true,
		});
	}
}
