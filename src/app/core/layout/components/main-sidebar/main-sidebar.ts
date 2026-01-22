import { Component, inject } from '@angular/core';
import { MainMenu } from '@core/layout/components/main-menu/main-menu';
import { MainMenuService } from '@core/layout/services/main-menu.service';
import { ScreenService } from '@core/layout/services/screen.service';
import { DrawerModule } from 'primeng/drawer';

@Component({
	selector: 'gb-main-sidebar',
	templateUrl: './main-sidebar.html',
	styleUrl: './main-sidebar.scss',
	imports: [DrawerModule, MainMenu],
})
export class MainSidebar {
	protected readonly mainMenuService = inject(MainMenuService);
	protected readonly screenService = inject(ScreenService);
}
