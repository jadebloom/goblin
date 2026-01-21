import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteAllCurrenciesService {
	private readonly http = inject(HttpClient);

	deleteAllCurrencies(): Observable<void> {
		return this.http
			.delete('/api/v1/currencies/all', { withCredentials: true })
			.pipe(map(() => {}));
	}
}
