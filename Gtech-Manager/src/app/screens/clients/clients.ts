import { Component, inject, signal } from '@angular/core';
import { Title } from "../../components/shared/title/title";
import { CommonModule } from '@angular/common';
import { ClientForms } from './form/form';
import { ClientService } from '../../services/http.service';
import { Client } from '../../services/client.model';
import { ShowClients } from './show-clients/show-clients';


@Component({
  selector: 'app-clients',
  imports: [Title, CommonModule, ClientForms, ShowClients],
  templateUrl: './clients.html',
  styleUrl: './clients.sass',
})
export class Clients {
  private clientService = inject(ClientService)

  loading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  clients = signal<Client[]>([]);
  clientToEdit = signal<Client | null>(null);

  clearMessages(delay: number = 3000) {
  setTimeout(() => {
    this.successMessage.set(null);
    this.errorMessage.set(null);
  }, delay);
}

  ngOnInit() {
    this.loading.set(true);
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients.set(data);
        this.loading.set(false);        
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set("Erro ao adicionar cliente");
        console.error(err);
      }
    });
  }

  addClient(client: Client) {
    this.loading.set(true);
    this.clientService.postClient(client).subscribe({
      next: (data) => {
        const currentClients = this.clients();
        this.clients.set([...currentClients, data]);
        this.loading.set(false);
        this.successMessage.set("Clientes adicionado com sucesso!");
        this.clearMessages();
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set("Erro ao adicionar cliente");
        this.clearMessages();
        console.error(err);
      }
    });
  }

  deleteClient(id: string) {
    this.loading.set(true);
    this.clientService.deleteClient(id).subscribe({
      next: () => {
        this.clients.update(list =>
          list.filter(c => c.id !== id)
        );
        this.loading.set(false);
        this.successMessage.set("Clientes deletado com sucesso!");
        this.clearMessages();
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set("Erro ao deletar cliente");
        this.clearMessages();
        console.error(err);
      }
    });
  }

  editClient(client: Client) {
    this.clientToEdit.set(client);
  }

  updateClient(client: Client) {
    this.loading.set(true);
    // O client.id vem do objeto emitido pelo form
    this.clientService.updateClient(client.id!, client).subscribe({
      next: (data) => {
        // Atualiza a lista localmente substituindo apenas o cliente editado
        this.clients.update(list =>
          list.map(c => c.id === client.id ? client : c)
        );
        this.loading.set(false);
        this.successMessage.set("Clientes editado com sucesso!");
        this.clearMessages();

        // LIMPA o estado de edição para o formulário voltar ao modo "Add"
        this.clientToEdit.set(null);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set("Erro ao adicionar cliente");
        this.clearMessages();
        console.error(err);
      }
    });
  }
}
