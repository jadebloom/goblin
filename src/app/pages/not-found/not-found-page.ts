import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ThemeToggle } from '@core/theme/components/dark-mode-toggle/dark-mode-toggle';

@Component({
	selector: 'gb-not-found-page',
	imports: [ButtonModule, ThemeToggle, RouterLink],
	templateUrl: './not-found-page.html',
})
export class NotFoundPage {}
