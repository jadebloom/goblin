import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '@features/expense/models/expense';
import { PaginationRequestPayload } from '@models/pagination-request-payload';
import { PaginationResponse } from '@models/pagination-response';
import { createPaginationParams } from '@utils/create-pagination-params';

@Injectable({ providedIn: 'root' })
export class FetchExpensesService {
	private readonly http = inject(HttpClient);

	fetchExpenses(pagination: PaginationRequestPayload): Observable<PaginationResponse<Expense>> {
		return this.http.get<PaginationResponse<Expense>>('/api/v1/expenses', {
			params: createPaginationParams(pagination),
			withCredentials: true,
		});
	}
}
