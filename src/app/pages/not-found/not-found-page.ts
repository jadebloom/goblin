import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'gb-not-found-page',
	imports: [ButtonModule, RouterLink],
	templateUrl: './not-found-page.html',
	styleUrl: './not-found-page.less',
})
export class NotFoundPage {}
