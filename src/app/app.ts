import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tmp } from './tmp';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, Tmp],
	template: `<gb-tmp />`,
})
export class App {}
