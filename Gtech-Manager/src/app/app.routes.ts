import { Routes } from '@angular/router';
import { Home } from './screens/home/home';

// App Router, faz as linkagens da pagina! 
export const routes: Routes = [
    {    
        path: '',
        component: Home, // Carrega direto quando for chamada a pagina, carrega tudo.
    },
    {    
        path: 'clients',
        loadComponent() {   //Carregamento lento, so vai carregar quando acessado
            return import ('./screens/clients/clients').then((m) => m.Clients) 
        },
    },
];
