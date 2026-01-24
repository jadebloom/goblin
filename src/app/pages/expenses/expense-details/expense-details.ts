import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { FetchExpenseService } from '@features/expense/services/fetch-expense.service';
import { ExpenseCategoryToolbar } from '@features/expense/components/expense-toolbar/expense-toolbar';
import { UpdateExpenseForm } from '@features/expense/components/update-expense-form/update-expense-form';
import { Expense } from '@features/expense/models/expense';

@Component({
	selector: 'gb-expense-details',
	templateUrl: './expense-details.html',
	imports: [
		ProgressSpinnerModule,
		MessageModule,
		ButtonModule,
		ExpenseCategoryToolbar,
		UpdateExpenseForm,
	],
	providers: [FetchExpenseService],
})
export class ExpenseDetails {
	protected readonly fetchExpenseService = inject(FetchExpenseService);
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	protected readonly expense = signal<Expense | null>(null);

	protected readonly isExpenseLoading = signal(false);

	ngOnInit() {
		this.loadExpense();
	}

	loadExpense() {
		if (this.isExpenseLoading()) return;

		this.isExpenseLoading.set(true);

		return this.activatedRoute.params
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isExpenseLoading.set(false)),
			)
			.subscribe((params) => {
				const id = params['id'];

				if (!id) return;

				this.fetchExpenseService
					.fetchExpenseById(id)
					.pipe(
						takeUntilDestroyed(this.destroyRef),
						finalize(() => this.isExpenseLoading.set(false)),
					)
					.subscribe({
						next: (res) => this.expense.set(res),
						error: (err) => {
							const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

							this.messageService.add({
								severity: 'error',
								summary: `Failed to load the expense with ID ${id}`,
								detail: detail,
								key: 'main',
							});
						},
					});
			});
	}
}
