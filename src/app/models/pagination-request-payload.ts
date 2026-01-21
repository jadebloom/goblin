import { SortParam } from '@models/sort-param';

export interface PaginationRequestPayload {
	page: number;
	size: number;
	sort?: SortParam[];
}
