import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { FetchCurrencyService } from '@features/currencies/services/fetch-currency.service';
import { UpdateCurrencyForm } from '@features/currencies/components/update-currency-form/update-currency-form';
import { Currency } from '@features/currencies/models/currency';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { CurrencyToolbar } from '@features/currencies/components/currency-toolbar/currency-toolbar';

@Component({
	selector: 'gb-currency-details-page',
	templateUrl: './currency-details.html',
	imports: [
		ProgressSpinnerModule,
		MessageModule,
		ButtonModule,
		UpdateCurrencyForm,
		CurrencyToolbar,
	],
})
export class CurrencyDetailsPage implements OnInit {
	protected readonly fetchCurrencyService = inject(FetchCurrencyService);
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly destroyRef = inject(DestroyRef);

	protected readonly currency = signal<Currency | null>(null);

	protected readonly isCurrencyLoading = signal(false);

	ngOnInit() {
		this.loadCurrency();
	}

	loadCurrency() {
		this.isCurrencyLoading.set(true);

		return this.activatedRoute.params
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isCurrencyLoading.set(false)),
			)
			.subscribe((params) => {
				const id = params['id'];

				if (!id) return;

				this.fetchCurrencyService
					.fetchCurrencyById(id)
					.pipe(
						takeUntilDestroyed(this.destroyRef),
						finalize(() => this.isCurrencyLoading.set(false)),
					)
					.subscribe({
						next: (res) => this.currency.set(res),
						error: (err) => console.error(err),
					});
			});
	}
}
