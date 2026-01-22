import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteAllExpensesByExpenseCategoryService {
	private readonly http = inject(HttpClient);

	deleteAllExpensesByTheirExpenseCategoryId(expenseCategoryId: number): Observable<void> {
		return this.http
			.delete(`/api/v1/expenses/categories/${encodeURIComponent(expenseCategoryId)}/expenses`, {
				withCredentials: true,
			})
			.pipe(map(() => {}));
	}
}
