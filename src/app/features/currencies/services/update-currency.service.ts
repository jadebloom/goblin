import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Currency } from '@features/currencies/models/currency';
import { UpdateCurrencyPayload } from '@features/currencies/models/update-currency-payload';

@Injectable({ providedIn: 'root' })
export class UpdateCurrencyService {
	private readonly httpClient = inject(HttpClient);

	updateCurrencyById(currencyId: number, payload: UpdateCurrencyPayload): Observable<Currency> {
		return this.httpClient
			.put('/api/v1/currencies/' + currencyId, payload, { withCredentials: true })
			.pipe(map((res) => res as Currency));
	}
}
