import { inject, Injectable, signal } from '@angular/core';
import { CurrenciesGettingService } from './currencies-getting.service';
import { MessageService } from 'primeng/api';
import { Currency } from '../models/currency';
import { Page } from '@models/page';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { TablePageEvent } from 'primeng/table';

@Injectable({ providedIn: 'root' })
export class CurrenciesTableService {
	readonly getting = inject(CurrenciesGettingService);
	private readonly messages = inject(MessageService);

	readonly currencies = signal<Currency[]>([]);

	pagination: Page = {
		number: 0,
		size: 20,
		totalElement: 0,
		totalPages: 0,
	};

	load() {
		this.getting.get().subscribe({
			next: (res) => {
				this.currencies.set(res.content ?? []);

				if (res.page != null) {
					this.pagination = res.page;
				}
			},
			error: (err) => {
				const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

				this.messages.add({
					severity: 'error',
					summary: 'Failed to get currencies',
					detail: detail,
					key: 'tr',
					life: 5000,
				});
			},
		});
	}

	pageChange(event: TablePageEvent) {
		this.pagination.number = event.first;

		this.pagination.size = event.rows;
	}

	isLastPage(): boolean {
		return this.pagination.number + 1 >= this.pagination.totalPages;
	}

	isFirstPage(): boolean {
		return this.pagination.number == 0;
	}
}
