import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { MessageService } from 'primeng/api';
import { AuthService } from '@core/auth/services/auth.service';
import { DarkModeToggle } from '@core/theme/components/dark-mode-toggle/dark-mode-toggle';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { AuthStatus } from '@core/auth/models/auth-status.model';
import { NavPanelService } from '@services/nav-panel.service';

@Component({
	selector: 'gb-toolkit-protected-header',
	templateUrl: './protected-header.html',
	imports: [ButtonModule, DrawerModule, PopoverModule, DarkModeToggle],
})
export class ProtectedHeader {
	readonly navPanel = inject(NavPanelService);
	readonly auth = inject(AuthService);
	private readonly router = inject(Router);
	private readonly messages = inject(MessageService);

	readonly isAuthenticated = computed(() => this.auth.authStatus() == AuthStatus.AUTHENTICATED);

	readonly popoverItems = [
		{
			label: 'Account',
			icon: 'pi pi-user',
			onClick: () => this.router.navigate(['/account']),
		},
		{
			label: 'Logout',
			icon: 'pi pi-sign-out',
			onClick: this.logout,
		},
	];

	logout() {
		this.auth.logout().subscribe({
			next: () => {
				this.router.navigate(['/registration']);
			},
			error: (err) => {
				const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

				this.messages.add({
					severity: 'error',
					summary: 'Logout Error',
					detail: detail,
					key: 'tr',
					life: 5000,
				});
			},
		});
	}
}
