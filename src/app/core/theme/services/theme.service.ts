import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { fromEventPattern, map } from 'rxjs';
import { Theme } from '@core/theme/models/theme.model';

@Injectable({ providedIn: 'root' })
export class ThemeService {
	private readonly platformId = inject(PLATFORM_ID);

	private readonly _theme = signal(Theme.DARK);

	readonly isDarkMode = computed(() => this._theme() == Theme.DARK);

	loadTheme(): Promise<void> {
		return new Promise(() => {
			if (isPlatformServer(this.platformId)) {
				return;
			}

			const mql = window.matchMedia('(prefers-color-scheme: light)');

			this.setTheme(mql.matches ? Theme.LIGHT : Theme.DARK);

			const systemTheme$ = fromEventPattern<MediaQueryList>(
				(handler) => mql.addEventListener('change', handler),
				(handler) => mql.removeEventListener('change', handler),
			).pipe(map((e) => (e.matches ? Theme.LIGHT : Theme.DARK)));

			systemTheme$.subscribe((theme) => this.setTheme(theme));
		});
	}

	toggleTheme() {
		if (isPlatformBrowser(this.platformId)) {
			const nextTheme = this._theme() == Theme.LIGHT ? Theme.DARK : Theme.LIGHT;

			this._theme.set(nextTheme);

			document.querySelector('html')?.classList.toggle('gb-app-dark');
		}
	}

	setTheme(theme: Theme) {
		const htmlClassList = document.querySelector('html')?.classList;

		if (htmlClassList == null) return;

		this._theme.set(theme);

		htmlClassList.remove('gb-app-dark');
		if (theme == Theme.DARK) htmlClassList.add('gb-app-dark');
		else htmlClassList.remove('gb-app-dark');
	}
}
