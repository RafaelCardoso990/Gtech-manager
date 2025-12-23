import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Client } from "./client.model";


@Injectable({ providedIn: 'root' })
export class ClientService {
    private http = inject(HttpClient)

    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>('http://localhost:5091/api/clients')
    }

    postClient(client: Client) {
        return this.http.post<Client>('http://localhost:5091/api/clients', client);
    }

    deleteClient(id: string) {
        return this.http.delete<Client>(`http://localhost:5091/api/clients/${id}`);
    }

    updateClient(id: string, client: Client) {
        return this.http.put<Client>(`http://localhost:5091/api/clients/${id}`, client);
    }
}