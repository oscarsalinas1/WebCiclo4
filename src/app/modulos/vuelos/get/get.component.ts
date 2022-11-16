import { Component, OnInit } from '@angular/core';
import { VueloModel } from 'src/app/modelos/vuelo.model';
import { VueloService } from 'src/app/servicios/vuelo.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-get',
  templateUrl:'./get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private vueloService: VueloService) { }
  listado: VueloModel[] = []

  ngOnInit(): void {
    this.getAll()

  }
  getAll(){
    this.vueloService.getAll().subscribe((data: VueloModel[]) => {
      this.listado = data
      console.log(data)
    })
  }
  delete(id?: any){
    console.log(id)
    Swal.fire({
      title: '¿Esta seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.vueloService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }

}