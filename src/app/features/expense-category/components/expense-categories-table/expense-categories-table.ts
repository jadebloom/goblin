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
import { ExpenseCategoriesTableService } from '@features/expense-category/services/expense-categories-table.service';
import { UpdateExpenseCategoryForm } from '@features/expense-category/components/update-expense-category-form/update-expense-category-form';
import { DeleteExpenseCategoryConfirm } from '@features/expense-category/components/delete-expense-category-confirm/delete-expense-category-confirm';
import { ExpenseCategory } from '@features/expense-category/models/expense-category';
import { RefreshableEmptyContent } from '@toolkit/components/refreshable-empty-content/refreshable-empty-content';

@Component({
	selector: 'gb-expense-categories-table',
	templateUrl: './expense-categories-table.html',
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
export class ExpenseCategoriesTable implements OnInit {
	protected readonly expenseCategoriesTableService = inject(ExpenseCategoriesTableService);
	protected readonly router = inject(Router);
	private readonly dialogService = inject(DialogService);

	private dialogRef?: DynamicDialogRef | null;

	ngOnInit(): void {
		this.expenseCategoriesTableService.loadExpenseCategoriesInTable();
	}

	protected openExpenseCategoryUpdateDialog(event: Event, expenseCategory: ExpenseCategory) {
		event.stopPropagation();

		this.dialogRef = this.dialogService.open(UpdateExpenseCategoryForm, {
			header: 'Update expense category',
			inputValues: {
				expenseCategory,
			},
			width: '24rem',
			breakpoints: {
				'768px': '90%',
			},
			baseZIndex: 10000,
			closable: true,
		});
	}

	openExpenseCategoryDeletionDialog(event: Event, expenseCategory: ExpenseCategory) {
		event.stopPropagation();

		this.dialogRef = this.dialogService.open(DeleteExpenseCategoryConfirm, {
			header: 'Deleting expense category',
			inputValues: {
				expenseCategory,
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
