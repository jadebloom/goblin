import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavPanelService {
	readonly isNavPanelVisible = signal(false);

	open() {
		this.isNavPanelVisible.set(true);
	}

	close() {
		this.isNavPanelVisible.set(false);
	}

	toggle() {
		this.isNavPanelVisible.update((prev) => !prev);
	}
}
