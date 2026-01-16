import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavDrawerService {
	readonly isDrawerVisible = signal(false);

	open() {
		this.isDrawerVisible.set(true);
	}

	close() {
		this.isDrawerVisible.set(false);
	}

	toggle() {
		this.isDrawerVisible.update((prev) => !prev);
	}
}
