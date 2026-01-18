import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Component({
	selector: 'gb-layout-global-toasts',
	templateUrl: './global-toasts.html',
	imports: [ToastModule],
})
export class GlobalToasts {}
