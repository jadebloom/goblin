import { Component, inject } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { NavDrawerService } from '@services/nav-drawer.service';

@Component({
	selector: 'gb-toolkit-nav-drawer',
	templateUrl: './nav-drawer.html',
	styleUrl: './nav-drawer.less',
	imports: [DrawerModule, ButtonModule],
})
export class NavDrawer {
	readonly navDrawer = inject(NavDrawerService);
}
