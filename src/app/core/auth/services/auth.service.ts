import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthResponse } from '@core/auth/models/auth-response.model';
import { AuthStatus } from '@core/auth/models/auth-status.model';
import { RegistrationPayload } from '@core/auth/models/registration-payload.model';
import { LoginPayload } from '@core/auth/models/login-payload.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly http = inject(HttpClient);
	private readonly platformId = inject(PLATFORM_ID);

	private readonly _authStatus = signal(AuthStatus.UNAUTHENTICATED);
	readonly authStatus = this._authStatus.asReadonly();

	setAuthenticated(token?: string) {
		if (token && isPlatformBrowser(this.platformId)) {
			localStorage.setItem('access_token', token);
		}

		this._authStatus.set(AuthStatus.AUTHENTICATED);
	}

	setUnauthenticated() {
		if (isPlatformBrowser(this.platformId)) {
			localStorage.removeItem('access_token');
		}

		this._authStatus.set(AuthStatus.UNAUTHENTICATED);
	}

	register(form: RegistrationPayload): Observable<AuthResponse> {
		this._authStatus.set(AuthStatus.LOADING);

		return this.http
			.post<AuthResponse>('/api/v1/authentication/registration', form, {
				withCredentials: true,
			})
			.pipe(
				map((res) => {
					if (res.access_token) {
						this.setAuthenticated(res.access_token);
					} else {
						this.setUnauthenticated();
					}

					return res;
				}),
				catchError((err) => {
					this.setUnauthenticated();

					return throwError(() => err);
				}),
			);
	}

	login(form: LoginPayload): Observable<AuthResponse> {
		this._authStatus.set(AuthStatus.LOADING);

		return this.http
			.post<AuthResponse>('/api/v1/authentication/login', form, {
				withCredentials: true,
			})
			.pipe(
				map((res) => {
					if (res.access_token) {
						this.setAuthenticated(res.access_token);
					} else {
						this.setUnauthenticated();
					}

					return res;
				}),
				catchError((err) => {
					this.setUnauthenticated();

					return throwError(() => err);
				}),
			);
	}

	refresh(): Observable<AuthStatus> {
		if (this.authStatus() === AuthStatus.LOADING) {
			return of(AuthStatus.LOADING);
		}

		this._authStatus.set(AuthStatus.LOADING);

		return this.http
			.post<AuthResponse>('/api/v1/authentication/refresh', {}, { withCredentials: true })
			.pipe(
				map((res) => {
					if (res.access_token) {
						this.setAuthenticated(res.access_token);

						return AuthStatus.AUTHENTICATED;
					}

					this.setUnauthenticated();

					return AuthStatus.UNAUTHENTICATED;
				}),
				catchError((err) => {
					this.setUnauthenticated();

					return throwError(() => err);
				}),
			);
	}

	logout(): Observable<void> {
		return this.http
			.post<void>('/api/v1/authentication/logout', {}, { withCredentials: true })
			.pipe(
				map(() => {
					this.setUnauthenticated();
				}),
			);
	}
}
