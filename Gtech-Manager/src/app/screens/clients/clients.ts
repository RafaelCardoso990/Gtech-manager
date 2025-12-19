import { Component } from '@angular/core';
import { Title } from "../../components/shared/title/title";
import { CommonModule } from '@angular/common';
import { ClientForms } from './form/form';

@Component({
  selector: 'app-clients',
  imports: [Title, CommonModule, ClientForms],
  templateUrl: './clients.html',
  styleUrl: './clients.sass',
})
export class Clients {
  
}
