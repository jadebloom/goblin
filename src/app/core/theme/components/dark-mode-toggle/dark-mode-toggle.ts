import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '@core/theme/services/theme.service';

@Component({
	selector: 'gb-theme-dark-mode-toggle',
	templateUrl: './dark-mode-toggle.html',
	imports: [ButtonModule],
})
export class DarkModeToggle {
	readonly theme = inject(ThemeService);
}
