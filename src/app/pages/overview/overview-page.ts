import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MainHeader } from '@toolkit/components/main-header/main-header';

@Component({
	selector: 'gb-overview-page',
	templateUrl: './overview-page.html',
	styleUrl: './overview-page.less',
	imports: [MainHeader],
})
export class OverviewPage {
	readonly items: MenuItem[] = [{ label: 'Overview' }];
	readonly home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
}
