import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViviendaImpl } from 'src/app/viviendas/models/vivienda-impl';
import { ViviendaService } from 'src/app/viviendas/service/vivienda.service';
import { environment } from 'src/environments/environment';
import { AlquilerImpl } from '../models/alquiler-impl';
import { OfertaImpl } from '../models/oferta-impl';
import { Tipo } from '../models/tipo';
import { VentaImpl } from '../models/venta-impl';
import { AlquilerService } from '../service/alquiler.service';
import { VentaService } from '../service/venta.service';

@Component({
  selector: 'app-oferta-form',
  templateUrl: './oferta-form.component.html',
  styleUrls: ['./oferta-form.component.css']
})
export class OfertaFormComponent implements OnInit {

  public oferta: OfertaImpl = new OfertaImpl(0,"","","");
  public ofertaForm: FormGroup;
  private host: string = environment.host;
  public urlEndPoint: string = `${this.host}ofertas`;
  type: number = 0;
  idVivienda: number=0;
  public viviendaSeleccionada: ViviendaImpl= new ViviendaImpl(0,"","","","",0,"",0,[],"");


  //public empleadoNombre:

  submitted: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private viviendaService: ViviendaService,
    private ventaService: VentaService,
    private alquilerService: AlquilerService
  ) {

    this.ofertaForm = this.formBuilder.group({
      tituloOferta: ['', Validators.required],
      precioDeVenta: [0],
      precioAlquilerMensual: [0],
      mesesFianza: [0]
    })
  }

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    this.idVivienda = this.route.snapshot.params['idVivienda'];

    console.log(this.type);
debugger;
    if(this.idVivienda){
      this.viviendaService.findById(this.idVivienda).subscribe(
        (response) => {
          debugger;
          this.viviendaSeleccionada = this.viviendaService.mapearVivienda(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  get form() {
    return this.ofertaForm.controls;
  }

  public onSubmit() {
    debugger;

    this.submitted = true;

    const ofertaEntity = this.ofertaForm.value;
      if (!this.ofertaForm.invalid ) {
        if (this.type == 2) {
          const venta: VentaImpl = new VentaImpl(
            0,
            ofertaEntity.tituloOferta,
            this.viviendaSeleccionada.urlVivienda,
            '',
            ofertaEntity.precioDeVenta
          );
          debugger;
          this.ventaService.create(venta).subscribe(
            () => {
              this.router.navigate([`/ofertas/ofertas-vivienda/${this.viviendaSeleccionada.idVivienda}`]);
            },
            (error: any) => {
              console.error(error);
            }
          );
        } else {
          const alquiler: AlquilerImpl = new AlquilerImpl(
            0,
            ofertaEntity.tituloOferta,
            this.viviendaSeleccionada.urlVivienda,
            '',
            ofertaEntity.precioAlquilerMensual,
            ofertaEntity.mesesFianza,
          );
          debugger;
          this.alquilerService.create(alquiler).subscribe(
            () => {
            this.router.navigate([`/ofertas/ofertas-vivienda/${this.viviendaSeleccionada.idVivienda}`]);
            },
            (error) => {
              console.error(error);
            }
          );
        }
      }
   /*  } */

    //se para aqui si el formulario es invalido
    if (this.ofertaForm.invalid) {
      return;
    }
    //display si hay exito
   /*  alert(
      'GUARDADO CON EXITO' +
      JSON.stringify(this.analiticaForm.value, null, 4)
    ); */

  }

  OnReset() {
    this.submitted = false;
    this.ofertaForm.reset();
  }


  cambiaViviendaSeleccionada(event: any) {
    this.viviendaSeleccionada = event.currentTarget.value;
}
}

