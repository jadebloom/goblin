import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem, MessageService } from 'primeng/api';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { AuthService } from '@core/auth/services/auth.service';
import { MainDrawerService } from '@services/main-drawer.service';

@Component({
	selector: 'gb-toolkit-main-drawer',
	templateUrl: './main-drawer.html',
	styleUrl: './main-drawer.less',
	imports: [DrawerModule, ButtonModule, PanelMenuModule],
})
export class MainDrawer {
	readonly mainDrawer = inject(MainDrawerService);
	private readonly auth = inject(AuthService);
	private readonly router = inject(Router);
	private readonly messages = inject(MessageService);

	readonly items: MenuItem[] = [
		{
			label: 'Currencies',
			icon: 'pi pi-dollar',
			items: [
				{
					label: 'View your currencies',
					icon: 'pi pi-list',
					routerLink: '/currencies',
				},
				{
					label: 'Create new currency',
					icon: 'pi pi-plus',
					routerLink: '/currencies/creation',
				},
			],
		},
		{
			label: 'Account',
			icon: 'pi pi-user',
			routerLink: '/account',
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
					key: 'tc',
					life: 5000,
				});
			},
		});
	}
}
