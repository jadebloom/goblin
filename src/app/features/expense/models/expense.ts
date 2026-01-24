export interface Expense {
	id: number;
	name: string;
	description: string | null;
	amount: number;
	currency_code: string;
	labels: string[] | null;
	expense_category_id: number;
	expense_category_name: string;
	creator_id: number;
	created_at: string;
}
