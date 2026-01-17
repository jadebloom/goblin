import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'gb-overview-page',
	templateUrl: './home-page.html',
})
export class HomePage {
	readonly items: MenuItem[] = [{ label: 'Overview' }];
	readonly home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
}
