import { Routes } from '@angular/router';
import { UsuarioComponent } from './Components/usuario-component/usuario-component';
import { UsuarioDetailComponent } from './Components/usuario-detail-component/usuario-detail-component';

export const routes: Routes = [
    { path: "", component: UsuarioComponent },
    { path: "usuario/:idUsuario", component: UsuarioDetailComponent } 
];