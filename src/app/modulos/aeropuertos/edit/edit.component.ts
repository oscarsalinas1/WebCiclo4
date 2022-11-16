import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AeropuertoModel } from 'src/app/modelos/aeropuerto.model';
import { AeropuertoService } from 'src/app/servicios/aeropuerto.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: string="";

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private aeropuertoService: AeropuertoService,
    private router: Router) { }

    fgValidacion = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      coordenada_x: ['', [Validators.required]],
      coordenada_y: ['', [Validators.required]],
      sigla: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
    });

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }
  
  buscarRegistro(id: string) {
    this.aeropuertoService.getWithId(id).subscribe((data: any) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id);
      this.fgValidacion.controls["nombre"].setValue(data.nombre);
      this.fgValidacion.controls["ciudad"].setValue(data.ciudad);
      this.fgValidacion.controls["pais"].setValue(data.pais);
      this.fgValidacion.controls["coordenada_x"].setValue(data.coordenada_x);
      this.fgValidacion.controls["coordenada_y"].setValue(data.coordenada_y);
      this.fgValidacion.controls["sigla"].setValue(data.sigla);
      this.fgValidacion.controls["tipo"].setValue(data.tipo);
    })
  }
  edit(){
    let aeropuerto = new AeropuertoModel();
    aeropuerto.nombre = this.fgValidacion.controls["nombre"].value as string;
    aeropuerto.ciudad = this.fgValidacion.controls["ciudad"].value as string;
    aeropuerto.pais = this.fgValidacion.controls["pais"].value as string;
    aeropuerto.coordenada_x = this.fgValidacion.controls["coordenada_x"].value as string;
    aeropuerto.coordenada_y = this.fgValidacion.controls["coordenada_y"].value as string;
    aeropuerto.sigla = this.fgValidacion.controls["sigla"].value as string;
    aeropuerto.tipo = this.fgValidacion.controls["tipo"].value as string;
 console.log(aeropuerto);
 
    this.aeropuertoService.update(aeropuerto).subscribe((data: AeropuertoModel)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/aeropuerto/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
