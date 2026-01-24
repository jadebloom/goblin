import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '@features/expense/models/expense';

@Injectable()
export class FetchExpenseService {
	private readonly http = inject(HttpClient);

	fetchExpenseById(expenseId: number): Observable<Expense> {
		return this.http.get<Expense>(`/api/v1/expenses/${encodeURIComponent(expenseId)}`, {
			withCredentials: true,
		});
	}
}
