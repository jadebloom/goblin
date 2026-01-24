import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { TablePageEvent } from 'primeng/table';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { FetchExpensesService } from '@features/expense/services/fetch-expenses.service';
import { Expense } from '@features/expense/models/expense';
import { PaginationPage } from '@models/pagination-page';

@Injectable({ providedIn: 'root' })
export class PaginatedExpensesService {
	readonly fetchExpensesService = inject(FetchExpensesService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	readonly pagination = signal<PaginationPage>({
		number: 0,
		size: 20,
		totalElement: 0,
		totalPages: 0,
	});

	readonly expenses = signal<Expense[] | null>(null);

	readonly areExpensesLoading = signal(false);

	loadExpenses() {
		if (this.areExpensesLoading()) return;

		this.areExpensesLoading.set(true);

		this.fetchExpensesService
			.fetchExpenses({
				page: this.pagination().number,
				size: this.pagination().size,
			})
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.areExpensesLoading.set(false)),
			)
			.subscribe({
				next: (res) => {
					this.pagination.set(res.page);

					this.expenses.set(res.content);
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messageService.add({
						severity: 'error',
						summary: 'Failed to load expenses into the table',
						detail: detail,
						key: 'main',
					});
				},
			});
	}

	pageChange(event: TablePageEvent) {
		this.pagination.update((prev) => ({ ...prev, number: event.first, size: event.rows }));

		this.loadExpenses();
	}

	isLastPage(): boolean {
		return this.pagination().number + 1 >= this.pagination().totalPages;
	}

	isFirstPage(): boolean {
		return this.pagination().number == 0;
	}
}
