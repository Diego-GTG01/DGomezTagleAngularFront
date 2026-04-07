import { Component } from '@angular/core';
import { UsuarioModel } from '../../Interfaces/UsuarioModel';
import { UsuarioService } from '../../Services/usuario-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioComponent } from '../usuario-component/usuario-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-detail-component',
  imports: [CommonModule],
  templateUrl: './usuario-detail-component.html',
  styleUrl: './usuario-detail-component.css',
})
export class UsuarioDetailComponent {

  public usuario: UsuarioModel | null = null;
  
  public idUsuario: string | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idUsuario = params.get('idUsuario');
      if(this.idUsuario!= undefined){
        this.GetById(Number(this.idUsuario));
      }
      
    });
  }
  GetById(idUsuario: Number) {
    this.usuarioService.getById(idUsuario).subscribe(
      data => {
        
        this.usuario = {} as UsuarioModel;
        this.usuario = data.Object; 

        
        console.log(this.usuario);
      },
      error => {
        console.log(error);
      }
    );
  }
  volverGetAll() {
    
    this.router.navigate(['']);
  }

}
