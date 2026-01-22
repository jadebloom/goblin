import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ExpenseCategory } from '@features/expense-category/models/expense-category';
import { DeleteExpenseCategoryConfirm } from '../delete-expense-category-confirm/delete-expense-category-confirm';
import { DeleteAllExpensesByCategoryConfirm } from '../delete-all-expenses-by-category-confirm/delete-all-expenses-by-category-confirm';

@Component({
	selector: 'gb-expense-category-toolbar',
	templateUrl: './expense-category-toolbar.html',
	imports: [ToolbarModule, ButtonModule],
	providers: [DialogService],
})
export class ExpenseCategoryToolbar {
	private readonly router = inject(Router);
	private readonly dialogService = inject(DialogService);

	readonly expenseCategory = input.required<ExpenseCategory>();

	private dialogRef?: DynamicDialogRef | null;

	navigateToExpenseCategoriesPage() {
		this.router.navigate(['/expenses/categories']);
	}

	openExpenseCategoryDeletionDialog(event: Event) {
		event.stopPropagation();

		this.dialogRef = this.dialogService.open(DeleteExpenseCategoryConfirm, {
			header: 'Deleting expense category',
			inputValues: {
				expenseCategory: this.expenseCategory(),
			},
			width: '24rem',
			breakpoints: {
				'768px': '90%',
			},
			baseZIndex: 10000,
			closable: true,
		});
	}

	openRelatedExpensesDeletionDialog(event: Event) {
		event.stopPropagation();

		this.dialogRef = this.dialogService.open(DeleteAllExpensesByCategoryConfirm, {
			header: 'Deleting all expenses that use this category',
			inputValues: {
				expenseCategory: this.expenseCategory(),
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
