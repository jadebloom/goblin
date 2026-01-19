import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { CurrencyCreationPayload } from '@features/currencies/models/currency-creation-payload';
import { Currency } from '@features/currencies/models/currency';

@Injectable({ providedIn: 'root' })
export class CurrencyCreationService {
	private readonly http = inject(HttpClient);

	readonly isLoading = signal(false);

	create(payload: CurrencyCreationPayload): Observable<Currency> {
		this.isLoading.set(true);

		return this.http.post('/api/v1/currencies', payload, { withCredentials: true }).pipe(
			map((res) => res as Currency),
			finalize(() => this.isLoading.set(false)),
		);
	}
}
