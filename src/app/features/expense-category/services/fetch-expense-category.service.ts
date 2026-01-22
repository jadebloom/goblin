import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ExpenseCategory } from '@features/expense-category/models/expense-category';

@Injectable({ providedIn: 'root' })
export class FetchExpenseCategoryService {
	private readonly http = inject(HttpClient);

	fetchExpenseCategoryById(expenseCategoryId: number): Observable<ExpenseCategory> {
		return this.http
			.get(`/api/v1/expenses/categories/${encodeURIComponent(expenseCategoryId)}`, {
				withCredentials: true,
			})
			.pipe(map((res) => res as ExpenseCategory));
	}
}
