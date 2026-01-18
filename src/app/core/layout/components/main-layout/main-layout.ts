import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartupService } from '@core/startup/startup.service';
import { AuthService } from '@core/auth/services/auth.service';
import { AuthStatus } from '@core/auth/models/auth-status.model';
import { MainMenuService } from '@core/layout/services/main-menu.service';
import { PrivateTopbar } from '@core/layout/components/private-topbar/private-topbar';
import { PublicTopbar } from '@core/layout/components/public-topbar/public-topbar';
import { MainFooter } from '@core/layout/components/main-footer/main-footer';
import { GlobalToasts } from '@core/layout/components/global-toasts/global-toasts';
import { Preloading } from '@core/layout/components/preloading/preloading';
import { MainSidebar } from '@core/layout/components/main-sidebar/main-sidebar';

@Component({
	selector: 'gb-layout-main-layout',
	templateUrl: './main-layout.html',
	imports: [
		RouterOutlet,
		PrivateTopbar,
		PublicTopbar,
		MainFooter,
		GlobalToasts,
		Preloading,
		MainSidebar,
	],
})
export class MainLayout {
	readonly auth = inject(AuthService);
	readonly startup = inject(StartupService);
	readonly mainMenu = inject(MainMenuService);

	readonly isAuthenticated = computed(() => this.auth.authStatus() == AuthStatus.AUTHENTICATED);

	readonly isUnauthenticated = computed(() => this.auth.authStatus() == AuthStatus.UNAUTHENTICATED);
}
