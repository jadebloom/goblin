import { Component, inject, OnDestroy } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateCurrencyForm } from '@features/currencies/components/create-currency-form/create-currency-form';
import { DeleteAllCurrenciesConfirm } from '@features/currencies/components/delete-all-currencies-confirm/delete-all-currencies-confirm';

@Component({
	selector: 'gb-currencies-currencies-toolbar',
	templateUrl: './currencies-toolbar.html',
	imports: [ToolbarModule, ButtonModule],
	providers: [DialogService],
})
export class CurrenciesToolbar implements OnDestroy {
	private readonly dialogService = inject(DialogService);

	private dialogRef?: DynamicDialogRef | null;

	openCurrencyCreationDialog() {
		this.dialogRef = this.dialogService.open(CreateCurrencyForm, {
			header: 'Create currency',
			width: '24rem',
			breakpoints: {
				'768px': '90%',
			},
			baseZIndex: 10000,
			closable: true,
		});
	}

	openDeleteAllCurrenciesDialog() {
		this.dialogRef = this.dialogService.open(DeleteAllCurrenciesConfirm, {
			header: 'Delete all currencies',
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
