import { Routes } from '@angular/router';
import { UsuarioComponent } from './Components/usuario-component/usuario-component';
import { UsuarioDetailComponent } from './Components/usuario-detail-component/usuario-detail-component';
import { UsuarioFormComponent } from './Components/usuario-form-component/usuario-form-component';

export const routes: Routes = [
    { path: "", component: UsuarioComponent },
     {path: 'usuario/form',component: UsuarioFormComponent },
    { path: "usuario/:idUsuario", component: UsuarioDetailComponent }
   

];