import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { AuthService } from '@core/auth/services/auth.service';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants';

@Component({
	selector: 'gb-account-avatar-popup',
	templateUrl: './avatar-popup.html',
	styleUrl: './avatar-popup.less',
	imports: [RouterLink, ButtonModule],
})
export class AvatarPopup {
	readonly auth = inject(AuthService);
	readonly router = inject(Router);
	readonly messages = inject(MessageService);

	logout() {
		this.auth.logout().subscribe({
			next: () => {
				this.router.navigate(['/registration']);
			},
			error: (err) => {
				const detail = err?.error?.detail ?? DEFAULT_ERROR_MESSAGE;

				this.messages.add({
					severity: 'error',
					summary: 'Logout Error',
					detail: detail,
					key: 'tc',
					life: 5000,
				});
			},
		});
	}
}
