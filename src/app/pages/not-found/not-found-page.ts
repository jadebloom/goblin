import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'gb-not-found-page',
	imports: [ButtonModule, RouterLink],
	templateUrl: './not-found-page.html',
	host: {
		class: 'flex flex-col flex-1 justify-center',
	},
})
export class NotFoundPage {}
