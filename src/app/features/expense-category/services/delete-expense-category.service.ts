import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteExpenseCategoryService {
	private readonly http = inject(HttpClient);

	deleteExpenseCategoryById(expenseCategoryId: number): Observable<void> {
		return this.http
			.delete(`/api/v1/expenses/categories/${encodeURIComponent(expenseCategoryId)}`)
			.pipe(map(() => {}));
	}
}
