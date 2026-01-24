import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteExpenseConfirm } from '@features/expense/components/delete-expense-confirm/delete-expense-confirm';
import { Expense } from '@features/expense/models/expense';

@Component({
	selector: 'gb-expense-toolbar',
	templateUrl: './expense-toolbar.html',
	imports: [ToolbarModule, ButtonModule],
	providers: [DialogService],
})
export class ExpenseCategoryToolbar {
	protected readonly router = inject(Router);
	private readonly dialogService = inject(DialogService);

	readonly expense = input.required<Expense>();

	private dialogRef?: DynamicDialogRef | null;

	openExpenseDeletionDialog(event: Event) {
		event.stopPropagation();

		this.dialogRef = this.dialogService.open(DeleteExpenseConfirm, {
			header: 'Deleting expense',
			inputValues: {
				expense: this.expense(),
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
