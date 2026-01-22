import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '@core/auth/services/auth.service';
import { AuthStatus } from '@core/auth/models/auth-status.model';

export const authGuard: CanActivateChildFn = () => {
	const authService = inject(AuthService);
	const router = inject(Router);
	const platformId = inject(PLATFORM_ID);

	if (isPlatformServer(platformId)) {
		return true;
	}

	return firstValueFrom(
		toObservable(authService.authStatus).pipe(
			filter((status) => status !== AuthStatus.LOADING),
			take(1),
			map((status) =>
				status === AuthStatus.AUTHENTICATED ? true : router.createUrlTree(['/registration']),
			),
		),
	);
};
