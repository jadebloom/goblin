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
import { PaginatedExpensesService } from '@features/expense/services/paginated-expenses.service';
import { Expense } from '@features/expense/models/expense';
import { DeleteExpenseConfirm } from '@features/expense/components/delete-expense-confirm/delete-expense-confirm';
import { UpdateExpenseForm } from '../update-expense-form/update-expense-form';

@Component({
	selector: 'gb-expenses-table',
	templateUrl: './expenses-table.html',
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
export class ExpensesTable implements OnInit {
	protected readonly paginatedExpensesService = inject(PaginatedExpensesService);
	protected readonly router = inject(Router);
	private readonly dialogService = inject(DialogService);

	private dialogRef?: DynamicDialogRef | null;

	ngOnInit(): void {
		this.paginatedExpensesService.loadExpenses();
	}

	protected openExpenseUpdateDialog(event: Event, expense: Expense) {
		event.stopPropagation();

		this.dialogRef = this.dialogService.open(UpdateExpenseForm, {
			header: 'Update expense',
			inputValues: {
				expense,
			},
			width: '36rem',
			breakpoints: {
				'768px': '90%',
			},
			baseZIndex: 10000,
			closable: true,
		});
	}

	openExpenseDeletionDialog(event: Event, expense: Expense) {
		event.stopPropagation();

		this.dialogRef = this.dialogService.open(DeleteExpenseConfirm, {
			header: 'Deleting expense',
			inputValues: {
				expense,
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
