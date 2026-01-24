import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateExpensePayload } from '@features/expense/models/create-expense-payload';
import { Expense } from '@features/expense/models/expense';

@Injectable({ providedIn: 'root' })
export class CreateExpenseService {
	private readonly http = inject(HttpClient);

	createExpense(payload: CreateExpensePayload): Observable<Expense> {
		return this.http.post<Expense>('/api/v1/expenses', payload, { withCredentials: true });
	}
}
