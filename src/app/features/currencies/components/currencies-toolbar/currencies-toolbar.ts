import { Component, inject, OnDestroy } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CurrencyCreationForm } from '@features/currencies/components/currency-creation-form/currency-creation-form';

@Component({
	selector: 'gb-currencies-currencies-toolbar',
	templateUrl: './currencies-toolbar.html',
	imports: [ToolbarModule, ButtonModule],
	providers: [DialogService],
})
export class CurrenciesToolbar implements OnDestroy {
	private readonly dialogService = inject(DialogService);

	dialogRef?: DynamicDialogRef | null;

	openCurrencyCreationDialog() {
		this.dialogRef = this.dialogService.open(CurrencyCreationForm, {
			header: 'Create currency',
			width: '24rem',
			breakpoints: {
				'768px': '90%',
			},
			baseZIndex: 10000,
			closable: true,
		});
	}

	ngOnDestroy() {
		if (this.dialogRef) {
			this.dialogRef.close();
		}
	}
}
