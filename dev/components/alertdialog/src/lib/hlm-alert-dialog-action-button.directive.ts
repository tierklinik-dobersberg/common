import { Directive } from '@angular/core';
import { HlmButtonDirective } from '@tierklinik-dobersberg/angular/button';

@Directive({
	selector: 'button[hlmAlertDialogAction]',
	standalone: true,
	hostDirectives: [HlmButtonDirective],
})
export class HlmAlertDialogActionButtonDirective {}
