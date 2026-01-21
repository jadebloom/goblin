import { HttpParams } from '@angular/common/http';
import { PaginationRequestPayload } from '@models/pagination-request-payload';

export function createPaginationParams(payload: PaginationRequestPayload): HttpParams {
	let params = new HttpParams().set('page', payload.page).set('size', payload.size);

	payload.sort?.forEach((s) => {
		params = params.append('sort', `${s.field},${s.direction}`);
	});

	return params;
}
