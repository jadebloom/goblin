import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { Currency } from '@features/currencies/models/currency';
import { CurrencyUpdatePayload } from '@features/currencies/models/currency-update-payload';

@Injectable({ providedIn: 'root' })
export class CurrencyUpdateService {
	private readonly httpClient = inject(HttpClient);

	readonly isLoading = signal(false);

	update(currencyId: number, payload: CurrencyUpdatePayload): Observable<Currency> {
		this.isLoading.set(true);

		return this.httpClient
			.put('/api/v1/currencies/' + currencyId, payload, { withCredentials: true })
			.pipe(
				map((res) => res as Currency),
				finalize(() => this.isLoading.set(false)),
			);
	}
}
