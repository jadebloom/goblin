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
	selector: 'gb-layout-main-menu',
	templateUrl: './main-menu.html',
})
export class MainMenu {
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
			label: 'Expense Categories',
			items: [
				{
					label: 'View Categories',
					icon: 'pi pi-list',
					route: '/expenses/categories',
					onClick: () => this.router.navigate(['/expenses', 'categories']),
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
				this.router.navigate(['/auth/registration']);
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
