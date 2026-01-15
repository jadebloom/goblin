import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
	selector: '[gbSelectOnFocus]',
	host: {
		'(focus)': 'select()',
	},
})
export class SelectOnFocusDirective {
	private el = inject(ElementRef);

	select() {
		const element = this.el.nativeElement;

		if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
			element.select();
		} else if (element.isContentEditable) {
			const range = document.createRange();
			range.selectNodeContents(element);
			const selection = window.getSelection();
			selection?.removeAllRanges();
			selection?.addRange(range);
		}
	}
}
