import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteAllExpensesByCurrencyService {
	private readonly http = inject(HttpClient);

	deleteAllExpensesByTheirCurrencyId(currencyId: number): Observable<void> {
		return this.http
			.delete(`/api/v1/currencies/${encodeURIComponent(currencyId)}/expenses`, {
				withCredentials: true,
			})
			.pipe(map(() => {}));
	}
}
