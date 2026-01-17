import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MainDrawerService {
	readonly isMainDrawerVisible = signal(false);

	open() {
		this.isMainDrawerVisible.set(true);
	}

	close() {
		this.isMainDrawerVisible.set(false);
	}

	toggle() {
		this.isMainDrawerVisible.update((prev) => !prev);
	}
}
