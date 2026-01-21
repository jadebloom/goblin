import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateCurrencyPayload } from '@features/currencies/models/create-currency-payload';
import { Currency } from '@features/currencies/models/currency';

@Injectable({ providedIn: 'root' })
export class CreateCurrencyService {
	private readonly http = inject(HttpClient);

	createCurrency(payload: CreateCurrencyPayload): Observable<Currency> {
		return this.http
			.post('/api/v1/currencies', payload, { withCredentials: true })
			.pipe(map((res) => res as Currency));
	}
}
