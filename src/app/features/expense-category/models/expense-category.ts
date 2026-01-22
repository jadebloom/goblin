export interface ExpenseCategory {
	id: number;
	name: string;
	description: string | null;
	hex_color_code: string | null;
	creator_id: number;
	created_at: string;
}
