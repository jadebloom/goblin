import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateExpensePayload } from '@features/expense/models/update-expense-payload';
import { Expense } from '@features/expense/models/expense';

@Injectable({ providedIn: 'root' })
export class UpdateExpenseService {
	private readonly http = inject(HttpClient);

	updateExpense(expenseId: number, payload: UpdateExpensePayload): Observable<Expense> {
		return this.http.put<Expense>(`/api/v1/expenses/${encodeURIComponent(expenseId)}`, payload, {
			withCredentials: true,
		});
	}
}
