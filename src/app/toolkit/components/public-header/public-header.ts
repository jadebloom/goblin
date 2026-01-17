import { Component, computed, inject } from '@angular/core';
import { AuthStatus } from '@core/auth/models/auth-status.model';
import { AuthService } from '@core/auth/services/auth.service';
import { DarkModeToggle } from '@core/theme/components/dark-mode-toggle/dark-mode-toggle';

@Component({
	selector: 'gb-toolkit-public-header',
	templateUrl: './public-header.html',
	imports: [DarkModeToggle],
})
export class PublicHeader {
	readonly auth = inject(AuthService);

	readonly isUnauthenticated = computed(() => this.auth.authStatus() == AuthStatus.UNAUTHENTICATED);
}
