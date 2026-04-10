import { Component } from '@angular/core';
import { UsuarioModel } from '../../Interfaces/UsuarioModel';
import { UsuarioService } from '../../Services/usuario-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioComponent } from '../usuario-component/usuario-component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idUsuario = params.get('idUsuario');
      if (this.idUsuario != undefined) {
        this.GetById(Number(this.idUsuario));
      }
    });
  }
  GetById(idUsuario: Number) {
    this.usuarioService.getById(idUsuario).subscribe(
      (data) => {
        this.usuario = {} as UsuarioModel;
        this.usuario = data.Object;

        console.log(this.usuario);
      },
      (error) => {
        console.log(error);
      },
    );
  }
  ModalUpdateImagen(usuario: UsuarioModel) {
    Swal.fire({
      title: 'Seleccione su imagen de perfil',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Seleccione su imagen de perfil',
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Nombre:', result.value);

        const file = result.value;
        if (file) {
          // Validar que sea imagen
          if (file.type === 'image/jpeg' || file.type === 'image/png') {
            const formData = new FormData();

            formData.append('imagen', file);
            console.log(formData)
            this.usuarioService.updateImagen(usuario.IdUsuario, formData).subscribe(
              (data) => {
                console.log(data);
                this.usuario!.ImagenFile = data.Object.ImagenFile;
                Swal.fire({
                  icon: 'success',
                  title: 'Imagen actualizada correctamente',
                  timer: 1000,
                  showConfirmButton: false,
                  position: 'top-end',
                  toast: true,
                });
              },
              (error) => {
                console.log(error);
              },
            );
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Formato de imagen no válido',
              timer: 1000,
              showConfirmButton: false,
              position: 'top-end',
              toast: true,
            });
          }
        }
      }
    });
  }
  volverGetAll() {
    this.router.navigate(['']);
  }
}
