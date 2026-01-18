import { Injectable, signal, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScreenService implements OnDestroy {
	private readonly platformId = inject(PLATFORM_ID);

	private readonly _isScreenSm = signal(false);
	readonly isScreenSm = this._isScreenSm.asReadonly();

	private readonly _isScreenMd = signal(false);
	readonly isScreenMd = this._isScreenMd.asReadonly();

	private readonly _isScreenLg = signal(false);
	readonly isScreenLg = this._isScreenLg.asReadonly();

	private readonly _isScreenXl = signal(false);
	readonly isScreenXl = this._isScreenXl.asReadonly();

	private readonly _isScreen2Xl = signal(false);
	readonly isScreen2Xl = this._isScreen2Xl.asReadonly();

	private queries: { mql: MediaQueryList; listener: (e: MediaQueryListEvent) => void }[] = [];

	constructor() {
		if (!isPlatformBrowser(this.platformId)) return;

		const breakpoints = [
			{ signal: this._isScreenSm, query: '(max-width: 640px)' },
			{ signal: this._isScreenMd, query: '(max-width: 768px)' },
			{ signal: this._isScreenLg, query: '(max-width: 1024px)' },
			{ signal: this._isScreenXl, query: '(max-width: 1280px)' },
			{ signal: this._isScreen2Xl, query: '(max-width: 1536px)' },
		];

		breakpoints.forEach((bp) => {
			const mql = window.matchMedia(bp.query);
			bp.signal.set(mql.matches);

			const listener = (e: MediaQueryListEvent) => bp.signal.set(e.matches);
			mql.addEventListener('change', listener);

			this.queries.push({ mql, listener });
		});
	}

	ngOnDestroy(): void {
		this.queries.forEach(({ mql, listener }) => mql.removeEventListener('change', listener));
		this.queries = [];
	}
}
