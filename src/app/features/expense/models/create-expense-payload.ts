export interface CreateExpensePayload {
	name: string;
	description?: string | null;
	amount: number;
	currency_code: string;
	labels?: string[] | null;
	expense_category_id: number;
}
