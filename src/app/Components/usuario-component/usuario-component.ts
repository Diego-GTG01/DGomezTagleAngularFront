import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../Services/usuario-service';
import { UsuarioModel } from '../../Interfaces/UsuarioModel';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-component.html',
  styleUrls: ['./usuario-component.css'],
})
export class UsuarioComponent implements OnInit {

  public usuarios: UsuarioModel[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router : Router,

  ) {}

  ngOnInit(): void {
    this.GetAll(); 
  }

  GetAll() {
    this.usuarioService.getAll().subscribe(
      data => {
        this.usuarios = data.Objects;
        console.log(this.usuarios);
      },
      error => {
        console.log(error);
      }
    );
  }
  GetById(idUsuario : Number) {
    
    this.router.navigate(['/usuario/' + idUsuario]);
  }
  AddUsuario(){
    this.router.navigate(['/usuario/form']);
  }
    
}