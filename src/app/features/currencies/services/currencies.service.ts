import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CurrencyCreationPayload } from '@features/currencies/models/currency-creation-payload';
import { finalize, map, Observable } from 'rxjs';
import { Currency } from '../models/currency';

@Injectable({ providedIn: 'root' })
export class CurrenciesService {
	private readonly http = inject(HttpClient);

	readonly isCreationLoading = signal(false);

	create(payload: CurrencyCreationPayload): Observable<Currency> {
		this.isCreationLoading.set(true);

		return this.http.post('/api/v1/currencies', payload, { withCredentials: true }).pipe(
			map((res) => res as Currency),
			finalize(() => this.isCreationLoading.set(false)),
		);
	}
}
