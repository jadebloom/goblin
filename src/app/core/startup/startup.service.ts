import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { ThemeService } from '@core/theme/services/theme.service';
import { AuthService } from '@core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class StartupService {
	private readonly theme = inject(ThemeService);
	private readonly auth = inject(AuthService);
	private readonly platformId = inject(PLATFORM_ID);

	private readonly _isStartupFinished = signal(false);
	readonly isStartupFinished = this._isStartupFinished.asReadonly();

	startUp() {
		if (isPlatformBrowser(this.platformId)) {
			this.theme.loadTheme();

			this.auth.refresh().subscribe({
				next: () => this._isStartupFinished.set(true),
				error: () => this._isStartupFinished.set(true),
			});
		}
	}
}
