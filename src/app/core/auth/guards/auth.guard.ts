import { inject, PLATFORM_ID, effect } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { AuthService } from '@core/auth/services/auth.service';
import { AuthStatus } from '@core/auth/models/auth-status.model';

export const authGuard: CanActivateFn = () => {
	const auth = inject(AuthService);
	const router = inject(Router);
	const platformId = inject(PLATFORM_ID);

	if (isPlatformServer(platformId)) {
		return true;
	}

	return new Promise<boolean | ReturnType<Router['createUrlTree']>>((resolve) => {
		const effectRef = effect(() => {
			const status = auth.authStatus();

			if (status === AuthStatus.LOADING) {
				return;
			}

			effectRef.destroy();

			resolve(status === AuthStatus.AUTHENTICATED ? true : router.createUrlTree(['/registration']));
		});
	});
};
