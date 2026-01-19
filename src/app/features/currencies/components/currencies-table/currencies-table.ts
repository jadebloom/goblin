import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { CurrenciesTableService } from '@features/currencies/services/currencies-table.service';
import { CurrencyDeletionService } from '@features/currencies/services/currency-deletion.service';

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
	providers: [ConfirmationService],
})
export class CurrenciesTable {
	readonly table = inject(CurrenciesTableService);
	private readonly confirmation = inject(ConfirmationService);
	private readonly deletion = inject(CurrencyDeletionService);
	private readonly messages = inject(MessageService);

	ngOnInit() {
		this.table.load();
	}

	confirmDeletion(event: Event, currencyId: number) {
		this.confirmation.confirm({
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
				this.deletion.delete(currencyId).subscribe({
					next: () => {
						this.table.load();

						this.messages.add({
							severity: 'success',
							summary: 'Successful deletion!',
							detail: 'Successfully deleted the currency with ID=' + currencyId,
							key: 'main',
						});
					},
					error: (err) => {
						const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

						this.messages.add({
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
}
