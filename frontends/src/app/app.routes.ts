import { Routes } from '@angular/router';

import { MenuComponent } from '../components/menu.component';
import { ClienteFormComponent } from '../components/cliente-form/cliente-form.component';
import { ClienteListComponent } from '../components/cliente-list/cliente-list.component';

export const routes: Routes = [

    {
        path: '',
        component: MenuComponent
    },

    {
        path: 'agregar',
        component: ClienteFormComponent
    },

    {
        path: 'listar',
        component: ClienteListComponent
    },

    {
        path: '**',
        redirectTo: ''
    }

];