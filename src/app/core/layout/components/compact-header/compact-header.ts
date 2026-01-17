import { Component, inject } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { PopoverModule } from 'primeng/popover';
import { NavDrawer } from '@core/layout/components/nav-drawer/nav-drawer';
import { LayoutService } from '@core/layout/services/layout.service';
import { AvatarPopup } from '@features/account/avatar-popup/avatar-popup';

@Component({
	selector: 'gb-layout-compact-header',
	templateUrl: './compact-header.html',
	styleUrl: './compact-header.less',
	imports: [AvatarModule, PopoverModule, AvatarPopup, NavDrawer],
})
export class CompactHeader {
	readonly layout = inject(LayoutService);
}
