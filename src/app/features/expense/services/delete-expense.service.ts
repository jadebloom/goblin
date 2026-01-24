import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteExpenseService {
	private readonly http = inject(HttpClient);

	deleteExpenseById(expenseId: number): Observable<void> {
		return this.http.delete<void>(`/api/v1/expenses/${encodeURIComponent(expenseId)}`, {
			withCredentials: true,
		});
	}
}
