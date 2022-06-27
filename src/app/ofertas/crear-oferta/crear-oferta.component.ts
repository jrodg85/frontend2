import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViviendaImpl } from 'src/app/viviendas/models/vivienda-impl';
import { ViviendaService } from 'src/app/viviendas/service/vivienda.service';
import { environment } from 'src/environments/environment';
import { AlquilerImpl } from '../models/alquiler-impl';
import { OfertaImpl } from '../models/oferta-impl';
import { Tipo } from '../models/tipo';
import { VentaImpl } from '../models/venta-impl';
import { AlquilerService } from '../service/alquiler.service';
import { VentaService } from '../service/venta.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-oferta',
  templateUrl: './crear-oferta.component.html',
  styleUrls: ['./crear-oferta.component.css']
})
export class CrearOfertaComponent implements OnInit {
  public oferta: OfertaImpl = new OfertaImpl(0,"","","");
  public nuevaOfertaForm: FormGroup;
  private host: string = environment.host;
  public urlEndPoint: string = `${this.host}ofertas`;
  public viviendas: ViviendaImpl[] = [];
  public viviendaSeleccionada: ViviendaImpl= new ViviendaImpl(0,"","","","",0,"",0,[],"");

  //public empleadoNombre:

  public type: number=0;

  submitted: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private viviendaService: ViviendaService,
    private ventaService: VentaService,
    private alquilerService: AlquilerService
  ) {
    this.nuevaOfertaForm = this.formBuilder.group({
      //type: this.route.snapshot.params['type'],
      tituloOferta: ['', Validators.required],
      precioDeVenta: [0],
      precioAlquilerMensual: [0],
      mesesFianza: [0],
      vivienda: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    console.log(this.type);

    this.viviendaService.getViviendas().subscribe(
      (response) => {
        this.viviendas = this.viviendaService.extraerViviendas(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  get form() {
    return this.nuevaOfertaForm.controls;
  }

  public onSubmit() {

    this.submitted = true;

    const nuevaOfertaEntity = this.nuevaOfertaForm.value;
    ;
   /*  if (confirm('Revise los datos antes de aceptar')) { */
      ;
      if (!this.nuevaOfertaForm.invalid || true) {
        if (this.type == 2) {
          const venta: VentaImpl = new VentaImpl(
            0,
            nuevaOfertaEntity.tituloOferta,
            nuevaOfertaEntity.vivienda,
            '',
            nuevaOfertaEntity.precioDeVenta
          );
          this.ventaService.create(venta).subscribe(
            () => {
              this.router.navigate([`/ofertas`])
            },
            (error: any) => {
              console.error(error);
            }
          );
        } else {
          const alquiler: AlquilerImpl = new AlquilerImpl(
            0,
            nuevaOfertaEntity.tituloOferta,
            nuevaOfertaEntity.vivienda,
            '',
            nuevaOfertaEntity.precioAlquilerMensual,
            nuevaOfertaEntity.mesesFianza
          );
          this.alquilerService.create(alquiler).subscribe(
            () => {
              this.router.navigate([`/ofertas`])
            },
            (error) => {
              console.error(error);
            }
          );
        }
      }
   /*  } */

    //se para aqui si el formulario es invalido
    if (this.nuevaOfertaForm.invalid) {
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
    this.nuevaOfertaForm.reset();
  }

  cambiaTipo(event: any) {
    this.viviendaSeleccionada = event.currentTarget.value;
}
}
