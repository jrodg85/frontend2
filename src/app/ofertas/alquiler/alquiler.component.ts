import { Component, OnInit } from '@angular/core';
import { AuxiliarService } from 'src/app/service/auxiliar.service';
import { AlquilerImpl } from '../models/alquiler-impl';
import { AlquilerService } from '../service/alquiler.service';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.css']
})
export class AlquilerComponent implements OnInit {

  alquileres: AlquilerImpl[] = [];
  todosAlquiler: AlquilerImpl[] = [];
  numPaginas: number = 0;

    constructor(
  private alquilerService: AlquilerService,
  private auxService: AuxiliarService) {}


    ngOnInit(): void {
      this.alquilerService.getAlquiler().subscribe((response) => this.alquileres =
      this.alquilerService.extraerAlquiler(response));
      this.getTodosAlquileres();
    }


    getTodosAlquileres(): void {
      this.alquilerService.getAlquiler().subscribe(alquiler => {
        this.numPaginas = this.auxService.getPaginasResponse(alquiler);
        for (let index = 1; index <= this.numPaginas; index++) {
          this.alquilerService.getAlquilerPagina(index)
            .subscribe(response => {
              this.todosAlquiler.push(...this.alquilerService.extraerAlquiler(response));
            });
        }
      });
    }

  }

