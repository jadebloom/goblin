import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CurrenciesTableService } from '@features/currencies/services/currencies-table.service';
import { DeleteCurrencyConfirm } from '@features/currencies/components/delete-currency-confirm/delete-currency-confirm';
import { UpdateCurrencyForm } from '@features/currencies/components/update-currency-form/update-currency-form';
import { Currency } from '@features/currencies/models/currency';
import { RefreshableEmptyContent } from '@toolkit/components/refreshable-empty-content/refreshable-empty-content';

@Component({
	selector: 'gb-currencies-currencies-table',
	templateUrl: './currencies-table.html',
	imports: [
		ButtonModule,
		TableModule,
		ConfirmDialogModule,
		ButtonGroupModule,
		ProgressSpinnerModule,
		DatePipe,
		RefreshableEmptyContent,
	],
	providers: [ConfirmationService, DialogService],
})
export class CurrenciesTable implements OnInit {
	protected readonly currenciesTableService = inject(CurrenciesTableService);
	protected readonly router = inject(Router);
	private readonly dialogService = inject(DialogService);

	private dialogRef?: DynamicDialogRef | null;

	ngOnInit(): void {
		this.currenciesTableService.loadCurrenciesInTable();
	}

	openCurrencyUpdateDialog(event: Event, currency: Currency) {
		event.stopPropagation();

		this.dialogRef = this.dialogService.open(UpdateCurrencyForm, {
			header: 'Update currency',
			inputValues: {
				currency,
			},
			width: '24rem',
			breakpoints: {
				'768px': '90%',
			},
			baseZIndex: 10000,
			closable: true,
		});
	}

	openCurrencyDeleteDialog(event: Event, currency: Currency) {
		event.stopPropagation();

		this.dialogRef = this.dialogService.open(DeleteCurrencyConfirm, {
			header: 'Deleting currency',
			inputValues: {
				currency,
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
