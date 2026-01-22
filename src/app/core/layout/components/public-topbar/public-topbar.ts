import { Component } from '@angular/core';
import { DarkModeToggle } from '@core/theme/components/dark-mode-toggle/dark-mode-toggle';

@Component({
	selector: 'gb-public-topbar',
	templateUrl: './public-topbar.html',
	imports: [DarkModeToggle],
})
export class PublicTopbar {}
