import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Currency } from '@features/currencies/models/currency';
import { PaginationResponse } from '@models/pagination-response';
import { PaginationRequestPayload } from '@models/pagination-request-payload';
import { createPaginationParams } from '@utils/create-pagination-params';

@Injectable({ providedIn: 'root' })
export class FetchCurrenciesService {
	private readonly http = inject(HttpClient);

	fetchCurrencies(pagination: PaginationRequestPayload): Observable<PaginationResponse<Currency>> {
		return this.http
			.get('/api/v1/currencies', {
				params: createPaginationParams(pagination),
				withCredentials: true,
			})
			.pipe(map((res) => res as PaginationResponse<Currency>));
	}
}
