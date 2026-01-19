import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map, Observable } from 'rxjs';
import { Currency } from '@features/currencies/models/currency';
import { PaginationResponse } from '@models/pagination-response';

@Injectable({ providedIn: 'root' })
export class CurrenciesGettingService {
	private readonly http = inject(HttpClient);

	readonly isLoading = signal(false);

	get(): Observable<PaginationResponse<Currency>> {
		this.isLoading.set(true);

		return this.http.get('/api/v1/currencies', { withCredentials: true }).pipe(
			map((res) => res as PaginationResponse<Currency>),
			finalize(() => this.isLoading.set(false)),
		);
	}
}
