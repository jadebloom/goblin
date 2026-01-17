import { Component, inject } from '@angular/core';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@core/auth/services/auth.service';
import { DarkModeToggle } from '@core/theme/components/dark-mode-toggle/dark-mode-toggle';
import { MainDrawerService } from '@services/main-drawer.service';
import { Router } from '@angular/router';

@Component({
	selector: 'gb-toolkit-main-header',
	templateUrl: './main-header.html',
	imports: [ButtonModule, PopoverModule, DarkModeToggle],
})
export class MainHeader {
	readonly mainDrawer = inject(MainDrawerService);
	private readonly auth = inject(AuthService);
	private readonly router = inject(Router);

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
		});
	}
}
