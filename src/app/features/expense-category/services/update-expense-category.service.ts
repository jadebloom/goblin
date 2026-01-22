import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UpdateExpenseCategoryPayload } from '@features/expense-category/models/update-expense-category-payload';
import { ExpenseCategory } from '@features/expense-category/models/expense-category';

@Injectable({ providedIn: 'root' })
export class UpdateExpenseCategoryService {
	private readonly httpClient = inject(HttpClient);

	updateExpenseCategoryById(
		expenseCategoryId: number,
		payload: UpdateExpenseCategoryPayload,
	): Observable<ExpenseCategory> {
		return this.httpClient
			.put(`/api/v1/expenses/categories/${encodeURIComponent(expenseCategoryId)}`, payload, {
				withCredentials: true,
			})
			.pipe(map((res) => res as ExpenseCategory));
	}
}
