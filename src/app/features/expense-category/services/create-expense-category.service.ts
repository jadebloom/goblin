import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateExpenseCategoryPayload } from '@features/expense-category/models/create-expense-category-payload';
import { ExpenseCategory } from '@features/expense-category/models/expense-category';

@Injectable({ providedIn: 'root' })
export class CreateExpenseCategoryService {
	private readonly http = inject(HttpClient);

	createExpenseCategory(payload: CreateExpenseCategoryPayload): Observable<ExpenseCategory> {
		return this.http
			.post('/api/v1/expenses/categories', payload, { withCredentials: true })
			.pipe(map((res) => res as ExpenseCategory));
	}
}
