import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { of } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';
import { AuthService } from '@core/auth/services/auth.service';
import { AuthStatus } from '@core/auth/models/auth-status.model';

export const authGuard: CanActivateFn = () => {
	const auth = inject(AuthService);
	const router = inject(Router);
	const platformId = inject(PLATFORM_ID);

	if (isPlatformServer(platformId)) {
		return of(true);
	}

	return auth.isAuthenticated$.pipe(
		filter((state) => state !== AuthStatus.LOADING),
		map((state) =>
			state === AuthStatus.AUTHENTICATED ? true : router.createUrlTree(['/registration']),
		),
		take(1),
	);
};
