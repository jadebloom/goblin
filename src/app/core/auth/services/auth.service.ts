import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, map, Observable, of, take, throwError } from 'rxjs';
import { AuthResponse } from '@core/auth/models/auth-response.model';
import { AuthStatus } from '@core/auth/models/auth-status.model';
import { RegistrationPayload } from '@core/auth/models/registration-payload.model';
import { LoginPayload } from '@core/auth/models/login-payload.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly http = inject(HttpClient);
	private readonly platformId = inject(PLATFORM_ID);

	private readonly authStateSubject = new BehaviorSubject<AuthStatus>(AuthStatus.UNAUTHENTICATED);
	readonly isAuthenticated$ = this.authStateSubject.asObservable();

	readonly isRegistrationLoading = signal(false);
	readonly isLoginLoading = signal(false);

	register(form: RegistrationPayload): Observable<AuthResponse> {
		this.authStateSubject.next(AuthStatus.LOADING);
		this.isRegistrationLoading.set(true);

		return this.http
			.post<AuthResponse>('/api/v1/authentication/registration', form, {
				withCredentials: true,
			})
			.pipe(
				map((res) => {
					if (res.access_token) {
						localStorage.setItem('access_token', res.access_token);

						this.authStateSubject.next(AuthStatus.AUTHENTICATED);
					} else {
						this.authStateSubject.next(AuthStatus.UNAUTHENTICATED);
					}

					return res;
				}),
				catchError((err) => {
					this.authStateSubject.next(AuthStatus.UNAUTHENTICATED);

					return throwError(() => err);
				}),
				finalize(() => this.isRegistrationLoading.set(false)),
			);
	}

	login(form: LoginPayload): Observable<AuthResponse> {
		this.authStateSubject.next(AuthStatus.LOADING);
		this.isLoginLoading.set(true);

		return this.http
			.post<AuthResponse>('/api/v1/authentication/login', form, {
				withCredentials: true,
			})
			.pipe(
				map((res) => {
					if (res.access_token) {
						localStorage.setItem('access_token', res.access_token);

						this.authStateSubject.next(AuthStatus.AUTHENTICATED);
					} else {
						this.authStateSubject.next(AuthStatus.UNAUTHENTICATED);
					}

					return res;
				}),
				catchError((err) => {
					this.cleanUp();

					return throwError(() => err);
				}),
				finalize(() => this.isRegistrationLoading.set(false)),
			);
	}

	refresh(): Observable<AuthStatus> {
		if (this.authStateSubject.getValue() == AuthStatus.LOADING) {
			return of(AuthStatus.LOADING);
		}

		this.authStateSubject.next(AuthStatus.LOADING);

		return this.http
			.post<AuthResponse>(
				'/api/v1/authentication/refresh',
				{},
				{
					withCredentials: true,
				},
			)
			.pipe(
				map((res) => {
					if (res.access_token) {
						localStorage.setItem('access_token', res.access_token);

						this.authStateSubject.next(AuthStatus.AUTHENTICATED);
						return AuthStatus.AUTHENTICATED;
					}

					this.authStateSubject.next(AuthStatus.UNAUTHENTICATED);
					return AuthStatus.UNAUTHENTICATED;
				}),
				catchError(() => {
					this.cleanUp();

					return of(AuthStatus.UNAUTHENTICATED);
				}),
				take(1),
			);
	}

	private cleanUp() {
		this.authStateSubject.next(AuthStatus.UNAUTHENTICATED);

		if (isPlatformBrowser(this.platformId)) {
			localStorage.removeItem('access_token');
		}
	}
}
