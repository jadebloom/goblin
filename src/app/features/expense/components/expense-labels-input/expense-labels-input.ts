import { Component, input, model } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { MessageModule } from 'primeng/message';

@Component({
	selector: 'gb-expense-labels-input',
	templateUrl: './expense-labels-input.html',
	imports: [FormsModule, InputTextModule, ButtonModule, ChipModule, MessageModule],
})
export class ExpenseLabelsInput {
	readonly fc = input.required<FormControl<string[]>>();
	protected readonly label = model('');

	protected addLabel(event: KeyboardEvent): void {
		if (event.key != 'Enter') return;

		event.preventDefault();

		if (this.fc().getRawValue().includes(this.label())) {
			return;
		}

		if (this.label().length > 0 && this.label().length <= 16) {
			this.fc().setValue([...this.fc().getRawValue(), this.label()]);

			this.label.set('');
		}
	}

	protected removeAll(): void {
		this.fc().setValue([]);
	}

	protected removeLabel(label: string): void {
		const control = this.fc();
		const value = control.value ?? [];

		control.setValue(value.filter((v) => v !== label));
	}
}
