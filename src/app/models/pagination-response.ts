import { PaginationPage } from '@models/pagination-page';

export interface PaginationResponse<T> {
	page: PaginationPage;
	content: T[];
}
