import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPencil, faEye, faTrashCan, faEraser, faTrash, faX, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { OfertaImpl } from '../../models/oferta-impl';
import { OfertaService } from '../../service/oferta.service';

@Component({
  selector: 'app-ofertas-vivienda-item',
  templateUrl: './ofertas-vivienda-item.component.html',
  styleUrls: ['./ofertas-vivienda-item.component.css']
})
export class OfertasViviendaItemComponent implements OnInit {
  @Input() oferta: OfertaImpl = new OfertaImpl(0, '','','');
  @Output() ofertaSeleccionada = new EventEmitter<OfertaImpl>();
  @Output() ofertaEliminar = new EventEmitter<OfertaImpl>();
  @Output() ofertaEditar = new EventEmitter<OfertaImpl>();

  pencil = faPencil;
  mirar = faEye;
  trash = faTrashCan;
  eraser = faEraser;
  trash2 = faTrash;
  x = faX;
  modificar = faFilePen;

  oferta$: Observable<any> = new Observable<any>();
  todasOfertas: OfertaImpl[] = [];

  constructor(
    private ofertaService: OfertaService


) { }

  ngOnInit(): void {
  }

  public onSubmit() {


  }
  borrarOferta(oferta: OfertaImpl["idOferta"]): void {
    /* if (confirm('Confirme para eliminar')) { */
      this.ofertaEliminar.emit(this.oferta);


    /* } */

  }
  obtenerOferta() {
    this.ofertaSeleccionada.emit(this.oferta);
  }
  modificarOferta(oferta: OfertaImpl): void {
    this.ofertaService.patchOferta(oferta).subscribe();
  }
}
