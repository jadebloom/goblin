import { Injectable, signal } from '@angular/core';

// https://tailwindcss.com/docs/responsive-design#using-custom-breakpoints
@Injectable({ providedIn: 'root' })
export class LayoutService {
	private readonly _isCompactActive = signal(false);
	readonly isCompactActive = this._isCompactActive.asReadonly();

	private lgQuery = window.matchMedia('(max-width: 1024px)');

	constructor() {
		this._isCompactActive.set(this.lgQuery.matches);

		this.lgQuery.addEventListener('change', (e) => {
			this._isCompactActive.set(e.matches);
		});
	}
}
