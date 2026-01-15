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
			<p-toast key="tc" position="top-center" />

			@if (startUp.isStartupFinished()) {
				<router-outlet />
			} @else {
				<p-progress-spinner ariaLabel="App is starting up..." />
			}
		</main>
	`,
})
export class App {
	readonly startUp = inject(StartupService);
}
