import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'


@Component({
  selector: 'app-clientForms',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.sass',
})
export class ClientForms {
  clientForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.maxLength(12),
      Validators.pattern(/^\d+$/),
    ]),
  });

  onSubmit() {
    console.warn(this.clientForm.value)
  }
}
