import { Component, inject, OnDestroy } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExpenseCategoriesPaginatedService } from '@features/expense-category/services/expense-categories-paginated.service';
import { CreateExpenseCategoryForm } from '@features/expense-category/components/create-expense-category-form/create-expense-category-form';
import { DeleteAllExpenseCategoriesConfirm } from '@features/expense-category/components/delete-all-expense-categories-confirm/delete-all-expense-categories-confirm';

@Component({
	selector: 'gb-expense-categories-toolbar',
	templateUrl: './expense-categories-toolbar.html',
	imports: [ToolbarModule, ButtonModule],
	providers: [DialogService],
})
export class ExpenseCategoriesToolbar implements OnDestroy {
	protected readonly expenseCategoriesPaginatedService = inject(ExpenseCategoriesPaginatedService);
	private readonly dialogService = inject(DialogService);

	private dialogRef?: DynamicDialogRef | null;

	protected openExpenseCategoryCreationDialog() {
		this.dialogRef = this.dialogService.open(CreateExpenseCategoryForm, {
			header: 'Create expense category',
			width: '24rem',
			breakpoints: {
				'768px': '90%',
			},
			baseZIndex: 10000,
			closable: true,
		});
	}

	protected openAllExpenseCategoriesDeletionDialog() {
		this.dialogRef = this.dialogService.open(DeleteAllExpenseCategoriesConfirm, {
			header: 'Delete all expense categories',
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
