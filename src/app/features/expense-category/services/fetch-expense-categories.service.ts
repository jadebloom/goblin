import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ExpenseCategory } from '@features/expense-category/models/expense-category';
import { PaginationResponse } from '@models/pagination-response';
import { PaginationRequestPayload } from '@models/pagination-request-payload';
import { createPaginationParams } from '@utils/create-pagination-params';

@Injectable({ providedIn: 'root' })
export class FetchExpenseCategoriesService {
	private readonly http = inject(HttpClient);

	fetchExpenseCategories(
		pagination: PaginationRequestPayload,
	): Observable<PaginationResponse<ExpenseCategory>> {
		return this.http
			.get('/api/v1/expenses/categories', {
				params: createPaginationParams(pagination),
				withCredentials: true,
			})
			.pipe(map((res) => res as PaginationResponse<ExpenseCategory>));
	}
}
