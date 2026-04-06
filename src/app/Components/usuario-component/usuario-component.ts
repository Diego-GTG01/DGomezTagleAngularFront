import { Component } from '@angular/core';
import { UsuarioService } from '../../Services/usuario-service';
import { UsuarioModel } from '../../Interfaces/UsuarioModel';

@Component({
  selector: 'app-usuario-component',
  imports: [],
  templateUrl: './usuario-component.html',
  styleUrl: './usuario-component.css',
})
export class UsuarioComponent {

  public usuarios : UsuarioModel[] =[];
  constructor (private usuarioService: UsuarioService){}
  ngOnInit(): void{
    this.GetAll();
  }
  GetAll(){
    this.usuarioService.getAll().subscribe(
      data =>{
        this.usuarios= data.Objects;
        console.log(this.usuarios);
        
      },
      error=>{
        console.log(error)
      }
    )
  }

}
