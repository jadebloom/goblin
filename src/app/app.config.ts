import {
	ApplicationConfig,
	inject,
	provideAppInitializer,
	provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
	HTTP_INTERCEPTORS,
	provideHttpClient,
	withFetch,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { AuthInterceptor } from '@core/auth/interceptors/auth.interceptor';
import { StartupService } from '@core/startup/startup.service';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideClientHydration(withEventReplay()),
		providePrimeNG({
			theme: {
				preset: Aura,
				options: {
					darkModeSelector: '.gb-app-dark',
				},
			},
		}),
		provideAppInitializer(() => {
			const startUp = inject(StartupService);

			startUp.startUp();
		}),
		provideHttpClient(withFetch(), withInterceptorsFromDi()),
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		MessageService,
	],
};
