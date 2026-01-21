import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteCurrencyService {
	private readonly http = inject(HttpClient);

	deleteCurrencyById(currencyId: number): Observable<void> {
		return this.http.delete('/api/v1/currencies/' + currencyId).pipe(map(() => {}));
	}
}
