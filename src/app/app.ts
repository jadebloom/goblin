import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StartupService } from '@core/startup/startup.service';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, ToastModule, ProgressSpinnerModule],
	template: `
		<main class="app-shell">
			<p-toast
				key="tc"
				position="top-center"
				[breakpoints]="{ '920px': { width: '90%', right: 'auto' } }"
			/>

			@if (startUp.isStartupFinished()) {
				<router-outlet />
			} @else {
				<div class="app-shell-loading-container">
					<p-progress-spinner ariaLabel="App is starting up..." />
				</div>
			}
		</main>
	`,
})
export class App {
	readonly startUp = inject(StartupService);
}
