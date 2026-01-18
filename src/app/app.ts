import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DrawerModule } from 'primeng/drawer';
import { StartupService } from '@core/startup/startup.service';
import { ProtectedHeader } from '@toolkit/components/protected-header/protected-header';
import { PublicHeader } from '@toolkit/components/public-header/public-header';
import { NavPanel } from '@toolkit/components/nav-panel/nav-panel';
import { NavPanelService } from '@services/nav-panel.service';
import { ScreenService } from '@services/screen.service';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		DrawerModule,
		ToastModule,
		ProgressSpinnerModule,
		ProtectedHeader,
		PublicHeader,
		NavPanel,
	],
	template: `<main class="min-h-screen">
		@if (startUp.isStartupFinished()) {
			<p-toast
				key="tr"
				position="top-right"
				[breakpoints]="{ '640px': { width: '90%', right: 'auto' } }"
			/>

			@if (screen.isScreenLg()) {
				<p-drawer header="Welcome to Goblin!" [(visible)]="navPanel.isNavPanelVisible">
					<gb-toolkit-nav-panel />
				</p-drawer>
			}

			<gb-toolkit-protected-header />
			<gb-toolkit-public-header />

			<main class="p-6">
				<div class="flex">
					<div
						class="card fixed z-50 top-20 left-6 w-64 h-[calc(100vh-6rem)] overflow-y-auto select-none transform transition-transform duration-300"
						[class]="navPanel.isNavPanelVisible() ? 'translate-x-0' : '-translate-x-80'"
					>
						<gb-toolkit-nav-panel class="h-full" />
					</div>

					<div
						class="flex-1 overflow-auto transition-transform duration-300"
						[class]="navPanel.isNavPanelVisible() ? 'translate-x-70' : 'translate-x-0'"
					>
						<router-outlet />
					</div>
				</div>
			</main>
		} @else {
			<div class="flex justify-between items-center">
				<p-progress-spinner aria-label="App is starting up..." />
			</div>
		}
	</main>`,
})
export class App {
	readonly startUp = inject(StartupService);
	readonly screen = inject(ScreenService);
	readonly navPanel = inject(NavPanelService);
}
