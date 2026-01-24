export interface UpdateExpensePayload {
	name: string;
	amount: number;
	currency_code: string;
	description: string | null;
	labels: string[] | null;
	expense_category_id: number;
}
