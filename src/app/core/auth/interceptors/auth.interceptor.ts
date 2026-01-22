import { isPlatformServer } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '@core/auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private readonly authService = inject(AuthService);
	private readonly platformId = inject(PLATFORM_ID);

	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (isPlatformServer(this.platformId)) {
			return next.handle(req);
		}

		const token = localStorage.getItem('access_token');
		let authReq = req;

		authReq = token
			? req.clone({
					setHeaders: { Authorization: `Bearer ${token}` },
					withCredentials: true,
				})
			: req;

		return next.handle(authReq).pipe(
			catchError((err) => {
				if (err.status === 401) {
					return this.authService.refresh().pipe(
						switchMap(() => {
							const newAccessToken = localStorage.getItem('access_token');

							const newReq = req.clone({
								setHeaders: { Authorization: `Bearer ${newAccessToken}` },
								withCredentials: true,
							});

							return next.handle(newReq);
						}),
					);
				}

				return throwError(() => err);
			}),
		);
	}
}
