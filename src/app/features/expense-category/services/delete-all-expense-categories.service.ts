import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteAllExpenseCategoriesService {
	private readonly http = inject(HttpClient);

	deleteAllExpenseCategories(): Observable<void> {
		return this.http
			.delete('/api/v1/expenses/categories/all', { withCredentials: true })
			.pipe(map(() => {}));
	}
}
