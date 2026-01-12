import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'gb-not-found-page',
	imports: [MatButtonModule, MatIconModule],
	templateUrl: './index.html',
	styleUrl: './index.scss',
})
export default class NotFoundPage {}
