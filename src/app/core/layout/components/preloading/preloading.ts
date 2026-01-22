import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
	selector: 'gb-preloading',
	templateUrl: './preloading.html',
	imports: [ProgressSpinnerModule],
})
export class Preloading {}
