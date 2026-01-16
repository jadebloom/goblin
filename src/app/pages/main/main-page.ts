import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { PopoverModule } from 'primeng/popover';
import { AvatarPopup } from '@features/account/avatar-popup/avatar-popup';
import { NavDrawer } from '@toolkit/components/nav-drawer/nav-drawer';

@Component({
	selector: 'gb-main-page',
	templateUrl: './main-page.html',
	styleUrl: './main-page.less',
	imports: [AvatarModule, PopoverModule, NavDrawer, AvatarPopup],
})
export class MainPage {}
