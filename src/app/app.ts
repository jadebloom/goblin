import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StartupService } from '@core/startup/startup.service';
import { MainDrawer } from '@toolkit/components/main-drawer/main-drawer';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, ToastModule, ProgressSpinnerModule, MainDrawer],
	template: `<main class="h-screen">
		@if (startUp.isStartupFinished()) {
			<p-toast
				key="tc"
				position="top-center"
				[breakpoints]="{ '920px': { width: '90%', right: 'auto' } }"
			/>

			<gb-toolkit-main-drawer />

			<router-outlet />
		} @else {
			<div class="h-screen flex justify-between items-center">
				<p-progress-spinner aria-label="App is starting up..." />
			</div>
		}
	</main>`,
})
export class App {
	readonly startUp = inject(StartupService);
}
