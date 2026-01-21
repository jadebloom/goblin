import { Component, input } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'gb-toolkit-refreshable-empty-content',
	templateUrl: './refreshable-empty-content.html',
	imports: [MessageModule, ButtonModule],
})
export class RefreshableEmptyContent {
	readonly message = input('Unfortunately, no content could be displayed');
}
