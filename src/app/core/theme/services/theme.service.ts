import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, fromEventPattern, map, startWith } from 'rxjs';
import { Theme } from '@core/theme/models/theme.model';

@Injectable({ providedIn: 'root' })
export class ThemeService {
	private readonly platformId = inject(PLATFORM_ID);

	private readonly _theme$ = new BehaviorSubject<Theme>(Theme.DARK);

	loadTheme(): Promise<void> {
		return new Promise(() => {
			if (isPlatformServer(this.platformId)) {
				return;
			}

			const mql = window.matchMedia('(prefers-color-scheme: light)');

			const systemTheme$ = fromEventPattern<MediaQueryList>(
				(handler) => mql.addEventListener('change', handler),
				(handler) => mql.removeEventListener('change', handler),
			).pipe(
				map((e) => (e.matches ? Theme.LIGHT : Theme.DARK)),
				startWith(Theme.DARK),
			);

			systemTheme$.subscribe((theme) => this.setTheme(theme));
		});
	}

	toggleTheme() {
		if (isPlatformBrowser(this.platformId)) {
			const nextTheme = this._theme$.getValue() == Theme.LIGHT ? Theme.DARK : Theme.LIGHT;

			this._theme$.next(nextTheme);

			document.querySelector('html')?.classList.toggle('gb-app-dark');
		}
	}

	setTheme(theme: Theme) {
		const html = document.querySelector('html')?.classList;

		if (html == null) return;

		this._theme$.next(theme);

		if (theme == Theme.DARK) html.add('gb-app-dark');
		else html.remove('gb-app-dark');
	}
}
