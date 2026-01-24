import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteAllExpensesService {
	private readonly http = inject(HttpClient);

	deleteAllExpenses(): Observable<void> {
		return this.http.delete<void>('/api/v1/expenses/all', { withCredentials: true });
	}
}
