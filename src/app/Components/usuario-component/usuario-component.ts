import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../Services/usuario-service';
import { UsuarioModel } from '../../Interfaces/UsuarioModel';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll() {
    this.usuarioService.getAll().subscribe(
      (data) => {
        this.usuarios = data.Objects;
        console.log(this.usuarios);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  async cambiarEstado(usuario: UsuarioModel) {
    this.usuarioService.updateStatus(usuario.IdUsuario).subscribe({
      next: (data) => {
        usuario.Activo = usuario.Activo === 1 ? 0 : 1;
        usuario.UltimoAcceso = new Date();

        console.log('Estado actualizado correctamente:', data);
        Swal.fire({
          icon: 'success',
          title: 'Estado actualizado',
          timer: 1000,
          showConfirmButton: false,
          position: 'top-end',
          toast: true,
        });
      },
      error: (error) => {
        console.error('Error al actualizar el estado:', error);
        Swal.fire({
          icon: 'error',
          title: 'No se pudo cambiar el estado. Intente de nuevo.',
          timer: 1000,
          showConfirmButton: false,
          position: 'top-end',
          toast: true,
        });
      },
    });
  }
  GetById(idUsuario: Number) {
    this.router.navigate(['/usuario/' + idUsuario]);
  }
  AddUsuario() {
    this.router.navigate(['/usuario/form']);
  }
}
