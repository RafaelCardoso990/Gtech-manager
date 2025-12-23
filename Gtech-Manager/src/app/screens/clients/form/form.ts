import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'
import { Client } from '../../../services/client.model';
@Component({
  selector: 'app-clientForms',
  imports: [ReactiveFormsModule ],
  templateUrl: './form.html',
  styleUrl: './form.sass',
})

export class ClientForms {
  @Output() onAddClient = new EventEmitter<Client>();
  @Input() clientToEdit?: Client | null;
   @Input() loading: boolean = false;
  @Input() successMessage: string | null = null;
  @Input() errorMessage: string | null = null;

  clientForm = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    telefone: new FormControl('', [
      Validators.required,
      Validators.maxLength(12),
      Validators.pattern(/^\d+$/),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100),
    ]),
  });

  onSubmit() {
  if (this.clientForm.invalid || this.loading) return; // Previne cliques duplos se já estiver carregando

  const rawValues = this.clientForm.getRawValue();

  const clientData: Client = {
    nome: rawValues.nome!,
    telefone: rawValues.telefone!,
    email: rawValues.email!,
    id: this.clientToEdit?.id
  };

  this.onAddClient.emit(clientData);
  // O reset() deve ser movido para o sucesso da operação no Pai, 
  // ou mantido aqui se for uma operação instantânea.
}

  ngOnChanges() {    
    if (this.clientToEdit) {
      this.clientForm.patchValue(this.clientToEdit);
    } else {
      this.clientForm.reset();
    }
  }
}