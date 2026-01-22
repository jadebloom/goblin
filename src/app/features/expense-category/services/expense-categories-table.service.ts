import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { TablePageEvent } from 'primeng/table';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { FetchExpenseCategoriesService } from '@features/expense-category/services/fetch-expense-categories.service';
import { ExpenseCategory } from '@features/expense-category/models/expense-category';
import { PaginationPage } from '@models/pagination-page';

@Injectable({ providedIn: 'root' })
export class ExpenseCategoriesTableService {
	readonly fetchExpenseCategoriesService = inject(FetchExpenseCategoriesService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	readonly pagination = signal<PaginationPage>({
		number: 0,
		size: 20,
		totalElement: 0,
		totalPages: 0,
	});

	readonly expenseCategories = signal<ExpenseCategory[] | null>(null);

	readonly areExpenseCategoriesLoading = signal(false);

	loadExpenseCategoriesInTable() {
		if (this.areExpenseCategoriesLoading()) return;

		this.areExpenseCategoriesLoading.set(true);

		this.fetchExpenseCategoriesService
			.fetchExpenseCategories({
				page: this.pagination().number,
				size: this.pagination().size,
			})
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.areExpenseCategoriesLoading.set(false)),
			)
			.subscribe({
				next: (res) => {
					this.pagination.set(res.page);

					this.expenseCategories.set(res.content);
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messageService.add({
						severity: 'error',
						summary: 'Failed to load expense categories into the table',
						detail: detail,
						key: 'main',
					});
				},
			});
	}

	pageChange(event: TablePageEvent) {
		this.pagination.update((prev) => ({ ...prev, number: event.first, size: event.rows }));

		this.loadExpenseCategoriesInTable();
	}

	isLastPage(): boolean {
		return this.pagination().number + 1 >= this.pagination().totalPages;
	}

	isFirstPage(): boolean {
		return this.pagination().number == 0;
	}
}
