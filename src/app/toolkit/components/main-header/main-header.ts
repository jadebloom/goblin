import { Component, inject } from '@angular/core';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { MainDrawerService } from '@services/main-drawer.service';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'gb-toolkit-main-header',
	templateUrl: './main-header.html',
	styleUrl: './main-header.less',
	imports: [ButtonModule, PopoverModule, RouterLink],
})
export class MainHeader {
	readonly mainDrawer = inject(MainDrawerService);
}
