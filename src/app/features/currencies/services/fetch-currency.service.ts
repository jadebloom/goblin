import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Currency } from '@features/currencies/models/currency';

@Injectable({ providedIn: 'root' })
export class FetchCurrencyService {
	private readonly http = inject(HttpClient);

	fetchCurrencyById(currencyId: number): Observable<Currency> {
		return this.http
			.get(`/api/v1/currencies/${encodeURIComponent(currencyId)}`, {
				withCredentials: true,
			})
			.pipe(map((res) => res as Currency));
	}
}
