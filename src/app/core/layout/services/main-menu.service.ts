import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MainMenuService {
	readonly isMainMenuOpened = signal(false);

	open() {
		this.isMainMenuOpened.set(true);
	}

	close() {
		this.isMainMenuOpened.set(false);
	}

	toggle() {
		this.isMainMenuOpened.update((prev) => !prev);
	}
}
