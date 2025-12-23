import { Component, EventEmitter, input, Output } from '@angular/core';
import { Client } from '../../../services/client.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-show-clients',
  imports: [MatIconModule],
  templateUrl: './show-clients.html',
  styleUrl: './show-clients.sass',
})
export class ShowClients {
  client = input.required<Client[]>();
  
  @Output() onDeleteClient = new EventEmitter<string>();
  @Output() onEditClient = new EventEmitter<Client>();

  editClient(client: Client) {
    this.onEditClient.emit(client);
  }

  deleteClient(id: string) {
    this.onDeleteClient.emit(id);
  }
} 
