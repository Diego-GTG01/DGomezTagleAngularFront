import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { RolModel } from '../../Interfaces/RolModel';
import { ActivatedRoute, Router } from '@angular/router';
import { RolService } from '../../Services/rol-service';

import { UsuarioService } from '../../Services/usuario-service';
import { UsuarioModel } from '../../Interfaces/UsuarioModel';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { PaisService } from '../../Services/pais-service';
import { PaisModel } from '../../Interfaces/PaisModel';
import { EstadoModel } from '../../Interfaces/EstadoModel';
import { MunicipioModel } from '../../Interfaces/MunicipioModel';
import { ColoniaModel } from '../../Interfaces/ColoniaModel';
import { EstadoService } from '../../Services/estado-service';
import { MunicipioService } from '../../Services/municipio-service';
import { ColoniaService } from '../../Services/colonia-service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './usuario-form-component.html',
  styleUrls: ['./usuario-form-component.css'],
})
export class UsuarioFormComponent {
  constructor(
    private UsuarioService: UsuarioService,
    private rolService: RolService,
    private paisService: PaisService,
    private estadoService: EstadoService,
    private municipioService: MunicipioService,
    private coloniaService: ColoniaService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  //forma moderna de injectar dependencias
  private formularioReactivo = inject(FormBuilder);
  imagenSeleccionada: File | null = null;

  public usuario: UsuarioModel | undefined;
  roles: RolModel[] = [];
  paises: PaisModel[] = [];
  estados: EstadoModel[] = [];
  municipios: MunicipioModel[] = [];
  colonias: ColoniaModel[] = [];
  codigoPostal: String = '';

  ngOnInit(): void {
    this.CargarRoles();
    this.CargarPaises();
  }

  public usuarioForm: FormGroup = this.formularioReactivo.group({
    UserName: [''],
    ImagenFile: [''],
    Nombre: [''],
    ApellidoPaterno: [''],
    ApellidoMaterno: [''],
    Email: [''],
    Password: [''],
    FechaNacimiento: [''],
    Sexo: [''],
    Telefono: [''],
    Celular: [''],
    CURP: [''],
    Rol: this.formularioReactivo.group({
      IdRol: [null],
    }),
    Direcciones: this.formularioReactivo.group({
      IdDireccion: [0],
      Calle: [''],
      NumeroExterior: [''],
      NumeroInterior: [''],
      Colonia: this.formularioReactivo.group({
        IdColonia: [''],
        Nombre: [''],
        CodigoPostal: [''],
      }),
    }),
  });

  enviarFormulario() {
    const rawValue = this.usuarioForm.value;

    const usuarioProcesado = {
      ...rawValue,

      Direcciones: [
        {
          ...rawValue.Direcciones,
          IdDireccion: Number(rawValue.Direcciones?.IdDireccion) || 0,
          Colonia: {
            ...rawValue.Direcciones?.Colonia,
            IdColonia: Number(rawValue.Direcciones?.Colonia?.IdColonia) || 0,
          },
        },
      ],
      Rol: {
        ...rawValue.Rol,
        IdRol: Number(rawValue.Rol?.IdRol) || 0,
      },
    };

    const formData = new FormData();

    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }

    const usuarioBlob = new Blob([JSON.stringify(usuarioProcesado)], {
      type: 'application/json',
    });

    formData.append('usuario', usuarioBlob);

    this.UsuarioService.add(formData).subscribe({
      next: (data) => {
        if (data.Correct) {
          this.usuarioForm.reset();
          Swal.fire({
            title: 'Éxito',
            text: 'Se guardó el usuario correctamente',
            icon: 'success',
          });
        }
      },
      error: (err) => {
        console.error('Error completo del servidor:', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo guardar el usuario',
          icon: 'error',
        });
      },
    });
  }

  CargarRoles(): void {
    this.rolService.getAll().subscribe(
      (data) => {
        this.roles = data.Objects;
        console.log(this.roles);
      },
      (error) => {
        console.log(error);
      },
    );
  }
  private CargarPaises(): void {
    this.paisService.getAll().subscribe(
      (data) => {
        this.paises = data.Objects;
        console.log(this.paises);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  updatePais(event: any): void {
    const idPais = event.target.value;

    if (!idPais) {
      this.codigoPostal = '';
      this.colonias = [];
      this.municipios = [];
      this.estados = [];

      return;
    }

    this.estadoService.getEstadoByPais(idPais).subscribe({
      next: (result) => {
        this.codigoPostal = '';
        this.colonias = [];
        this.municipios = [];
        this.estados = [];
        this.estados = result.Objects;
        console.log(this.estados);
      },
      error: (err) => console.log(err),
    });
  }

  updateEstado(event: any): void {
    const idEstado = event.target.value;
    console.log(idEstado);

    if (!idEstado) {
      this.municipios = [];
      return;
    }

    this.municipioService.getMunicipioByEstado(idEstado).subscribe({
      next: (result) => {
        this.codigoPostal = '';
        this.colonias = [];
        this.municipios = [];

        this.municipios = result.Objects;
        console.log(this.municipios);
      },
      error: (err) => console.log(err),
    });
  }
  updateMunicipio(event: any): void {
    const idMunicipio = event.target.value;

    if (!idMunicipio) {
      this.colonias = [];
      return;
    }

    this.coloniaService.getColoniaByMunicipio(idMunicipio).subscribe({
      next: (result) => {
        this.codigoPostal = '';
        this.colonias = [];
        this.colonias = result.Objects;
        console.log(this.colonias);
      },
      error: (err) => console.log(err),
    });
  }
  updateColonia(event: any): void {
    const select = event.target;
    this.codigoPostal = select.options[select.selectedIndex].getAttribute('data-cp');
    console.log('CP:', this.codigoPostal);
  }

  public onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validar que sea imagen
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        this.imagenSeleccionada = file;
      } else {
        alert('Solo se permiten archivos JPG o PNG');
        event.target.value = ''; // Limpiar input
      }
    }
  }
  volverGetAll() {
    this.router.navigate(['']);
  }
}
