import { Component } from '@angular/core';
import { lucideChevronUp } from '@ng-icons/lucide';
import { HlmIconComponent, provideIcons } from '@tierklinik-dobersberg/angular/icon';

@Component({
	selector: 'hlm-select-scroll-up',
	standalone: true,
	imports: [HlmIconComponent],
	providers: [provideIcons({ lucideChevronUp })],
	host: {
		class: 'flex cursor-default items-center justify-center py-1',
	},
	template: `
		<hlm-icon class="ml-2 h-4 w-4" name="lucideChevronUp" />
	`,
})
export class HlmSelectScrollUpComponent {}
