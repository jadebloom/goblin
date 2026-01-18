import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';
import { AuthService } from '@core/auth/services/auth.service';

interface SidebarSection {
	label: string;
	items: SidebarItem[];
}

interface SidebarItem {
	label: string;
	icon: string;
	route?: string;
	onClick: () => void;
}

@Component({
	selector: 'gb-toolkit-nav-panel',
	templateUrl: './nav-panel.html',
})
export class NavPanel {
	readonly router = inject(Router);
	private readonly auth = inject(AuthService);
	private readonly messages = inject(MessageService);

	readonly sections: SidebarSection[] = [
		{
			label: 'Home',
			items: [
				{
					label: 'Go Home',
					icon: 'pi pi-home',
					route: '/',
					onClick: () => this.router.navigate(['/']),
				},
			],
		},
		{
			label: 'Currencies',
			items: [
				{
					label: 'View Currencies',
					icon: 'pi pi-dollar',
					route: '/currencies',
					onClick: () => this.router.navigate(['/currencies']),
				},
				{
					label: 'Create Currency',
					icon: 'pi pi-plus',
					route: '/currencies/creation',
					onClick: () => this.router.navigate(['/currencies/creation']),
				},
			],
		},
		{
			label: 'Account',
			items: [
				{
					label: 'Visit Account',
					icon: 'pi pi-user',
					route: '/account',
					onClick: () => this.router.navigate(['/account']),
				},
				{
					label: 'Logout',
					icon: 'pi pi-sign-out',
					onClick: () => this.logout(),
				},
			],
		},
		{
			label: 'Source',
			items: [
				{
					label: 'Visit Source',
					icon: 'pi pi-github',
					onClick: () => window.open('https://github.com/jadebloom/goblin', '_blank'),
				},
			],
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
