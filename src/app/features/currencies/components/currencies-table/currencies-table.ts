import { Component, inject, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { CurrenciesTableService } from '@features/currencies/services/currencies-table.service';
import { CurrencyDeletionService } from '@features/currencies/services/currency-deletion.service';
import { CurrencyUpdateForm } from '../currency-update-form/currency-update-form';
import { Currency } from '@features/currencies/models/currency';

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
	],
	providers: [ConfirmationService, DialogService],
})
export class CurrenciesTable implements OnDestroy {
	readonly tableService = inject(CurrenciesTableService);
	private readonly deletionService = inject(CurrencyDeletionService);
	private readonly confirmationService = inject(ConfirmationService);
	private readonly dialogService = inject(DialogService);
	private readonly messagesService = inject(MessageService);

	dialogRef?: DynamicDialogRef | null;

	ngOnInit() {
		this.tableService.load();
	}

	openCurrencyUpdateDialog(currency: Currency) {
		this.dialogRef = this.dialogService.open(CurrencyUpdateForm, {
			header: 'Update currency',
			inputValues: {
				initialCurrency: currency,
			},
			width: '24rem',
			breakpoints: {
				'768px': '90%',
			},
			baseZIndex: 10000,
			closable: true,
		});
	}

	confirmDeletion(event: Event, currencyId: unknown) {
		if (typeof currencyId != 'number') {
			this.messagesService.add({
				severity: 'error',
				summary: 'Failed to delete the currency with no ID',
				detail: 'The currency has no associated ID required for deletion',
				key: 'main',
			});

			return;
		}

		this.confirmationService.confirm({
			target: event.target as EventTarget,
			message: 'Do you want to delete this currency?',
			header: 'Danger Zone',
			icon: 'pi pi-info-circle',
			rejectLabel: 'Cancel',
			rejectButtonProps: {
				label: 'Cancel',
				severity: 'secondary',
				outlined: true,
			},
			acceptButtonProps: {
				label: 'Delete',
				severity: 'danger',
			},
			accept: () => {
				this.deletionService.delete(currencyId).subscribe({
					next: () => {
						this.tableService.load();

						this.messagesService.add({
							severity: 'success',
							summary: 'Successful deletion!',
							detail: 'Successfully deleted the currency with ID=' + currencyId,
							key: 'main',
						});
					},
					error: (err) => {
						const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

						this.messagesService.add({
							severity: 'error',
							summary: 'Failed to delete the currency with ID=' + currencyId,
							detail: detail,
							key: 'main',
						});
					},
				});
			},
		});
	}

	ngOnDestroy() {
		if (this.dialogRef) {
			this.dialogRef.close();
		}
	}
}
