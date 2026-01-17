import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StartupService } from '@core/startup/startup.service';
import { MainDrawer } from '@toolkit/components/main-drawer/main-drawer';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, ToastModule, ProgressSpinnerModule, MainDrawer],
	templateUrl: './app.html',
})
export class App {
	readonly startUp = inject(StartupService);
}
