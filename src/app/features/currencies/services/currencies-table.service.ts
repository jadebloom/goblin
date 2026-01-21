import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { TablePageEvent } from 'primeng/table';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { FetchCurrenciesService } from '@features/currencies/services/fetch-currencies.service';
import { Currency } from '@features/currencies/models/currency';
import { PaginationPage } from '@models/pagination-page';

@Injectable({ providedIn: 'root' })
export class CurrenciesTableService {
	readonly fetchCurrenciesService = inject(FetchCurrenciesService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	readonly pagination = signal<PaginationPage>({
		number: 0,
		size: 20,
		totalElement: 0,
		totalPages: 0,
	});

	readonly currencies = signal<Currency[] | null>(null);

	readonly areCurrenciesLoading = signal(false);

	loadCurrenciesInTable() {
		if (this.areCurrenciesLoading()) return;

		this.areCurrenciesLoading.set(true);

		this.fetchCurrenciesService
			.fetchCurrencies({
				page: this.pagination().number,
				size: this.pagination().size,
			})
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.areCurrenciesLoading.set(false)),
			)
			.subscribe({
				next: (res) => {
					this.pagination.set(res.page);

					this.currencies.set(res.content);
				},
				error: (err) => {
					const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

					this.messageService.add({
						severity: 'error',
						summary: 'Failed to get currencies',
						detail: detail,
						key: 'main',
					});
				},
			});
	}

	pageChange(event: TablePageEvent) {
		this.pagination.update((prev) => ({ ...prev, number: event.first, size: event.rows }));

		this.loadCurrenciesInTable();
	}

	isLastPage(): boolean {
		return this.pagination().number + 1 >= this.pagination().totalPages;
	}

	isFirstPage(): boolean {
		return this.pagination().number == 0;
	}
}
