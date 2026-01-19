import { Page } from '@models/page';

export interface PaginationResponse<T> {
	page?: Page;
	content?: T[];
}
