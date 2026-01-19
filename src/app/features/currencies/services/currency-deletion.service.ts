import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyDeletionService {
	private readonly http = inject(HttpClient);

	readonly isLoading = signal(false);

	delete(currencyId: number): Observable<void> {
		this.isLoading.set(true);

		return this.http.delete('/api/v1/currencies/' + currencyId).pipe(
			map(() => {}),
			finalize(() => this.isLoading.set(false)),
		);
	}
}
