import { Component, inject } from '@angular/core';
import { Page } from "./components/shared/page/page";
import { ClientService } from './services/http.service';



@Component({
  selector: 'app-root',  
  templateUrl: './app.html',
  styleUrl: './app.sass',
  imports: [Page],
})
export class App {
  private httpService = inject(ClientService)
}
