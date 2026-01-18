import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { MessageService } from 'primeng/api';
import { AuthService } from '@core/auth/services/auth.service';
import { DarkModeToggle } from '@core/theme/components/dark-mode-toggle/dark-mode-toggle';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { MainMenuService } from '@core/layout/services/main-menu.service';

@Component({
	selector: 'gb-layout-private-topbar',
	templateUrl: './private-topbar.html',
	imports: [ButtonModule, DrawerModule, PopoverModule, DarkModeToggle],
})
export class PrivateTopbar {
	readonly mainMenu = inject(MainMenuService);
	private readonly auth = inject(AuthService);
	private readonly router = inject(Router);
	private readonly messages = inject(MessageService);

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
