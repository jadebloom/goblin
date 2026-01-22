import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { FetchExpenseCategoryService } from '@features/expense-category/services/fetch-expense-category.service';
import { ExpenseCategoryToolbar } from '@features/expense-category/components/expense-category-toolbar/expense-category-toolbar';
import { UpdateExpenseCategoryForm } from '@features/expense-category/components/update-expense-category-form/update-expense-category-form';
import { ExpenseCategory } from '@features/expense-category/models/expense-category';

@Component({
	selector: 'gb-expense-category-details-page',
	templateUrl: './expense-category-details.html',
	imports: [
		ProgressSpinnerModule,
		MessageModule,
		ButtonModule,
		ExpenseCategoryToolbar,
		UpdateExpenseCategoryForm,
	],
})
export class ExpenseCategoriesDetailsPage implements OnInit {
	protected readonly fetchExpenseCategoryService = inject(FetchExpenseCategoryService);
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	protected readonly expenseCategory = signal<ExpenseCategory | null>(null);

	protected readonly isExpenseCategoryLoading = signal(false);

	ngOnInit() {
		this.loadExpenseCategory();
	}

	loadExpenseCategory() {
		if (this.isExpenseCategoryLoading()) return;

		this.isExpenseCategoryLoading.set(true);

		return this.activatedRoute.params
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isExpenseCategoryLoading.set(false)),
			)
			.subscribe((params) => {
				const id = params['id'];

				if (!id) return;

				this.fetchExpenseCategoryService
					.fetchExpenseCategoryById(id)
					.pipe(
						takeUntilDestroyed(this.destroyRef),
						finalize(() => this.isExpenseCategoryLoading.set(false)),
					)
					.subscribe({
						next: (res) => this.expenseCategory.set(res),
						error: (err) => {
							const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

							this.messageService.add({
								severity: 'error',
								summary: `Failed to load the expense category wiht ID ${id}`,
								detail: detail,
								key: 'main',
							});
						},
					});
			});
	}
}
