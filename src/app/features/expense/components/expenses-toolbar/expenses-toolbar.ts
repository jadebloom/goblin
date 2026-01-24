import { Component, inject, OnDestroy } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatedExpensesService } from '@features/expense/services/paginated-expenses.service';
import { CreateExpenseForm } from '@features/expense/components/create-expense-form/create-expense-form';
import { DeleteAllExpensesConfirm } from '@features/expense/components/delete-all-expenses-confirm/delete-all-expenses-confirm';

@Component({
	selector: 'gb-expenses-toolbar',
	templateUrl: './expenses-toolbar.html',
	imports: [ToolbarModule, ButtonModule],
	providers: [DialogService],
})
export class ExpensesToolbar implements OnDestroy {
	protected readonly paginatedExpensesService = inject(PaginatedExpensesService);
	private readonly dialogService = inject(DialogService);

	private dialogRef?: DynamicDialogRef | null;

	protected openExpenseCreationDialog() {
		this.dialogRef = this.dialogService.open(CreateExpenseForm, {
			header: 'Create expense',
			width: '36rem',
			breakpoints: {
				'768px': '90%',
			},
			baseZIndex: 10000,
			closable: true,
		});
	}

	protected openAllExpensesDeletionDialog() {
		this.dialogRef = this.dialogService.open(DeleteAllExpensesConfirm, {
			header: 'Delete all expenses',
			width: '24rem',
			breakpoints: {
				'768px': '90%',
			},
			baseZIndex: 10000,
			closable: true,
		});
	}

	ngOnDestroy() {
		if (this.dialogRef) this.dialogRef.close();
	}
}
