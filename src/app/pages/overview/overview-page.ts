import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CompactHeader } from '@core/layout/components/compact-header/compact-header';
import { NavSidebar } from '@core/layout/components/nav-sidebar/nav-sidebar';

@Component({
	selector: 'gb-overview-page',
	templateUrl: './overview-page.html',
	styleUrl: './overview-page.less',
	imports: [BreadcrumbModule, CompactHeader, NavSidebar],
})
export class OverviewPage {
	readonly items: MenuItem[] = [{ label: 'Overview' }];
	readonly home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
}
