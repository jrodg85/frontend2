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
import { ActivatedRoute } from '@angular/router';

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

  //public empleadoNombre:

  public type: number=0;

  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private viviendaService: ViviendaService,
    private ventaService: VentaService,
    private alquilerService: AlquilerService
  ) {
    this.nuevaOfertaForm = this.formBuilder.group({
      type: ['', Validators.required],
      tituloOferta: ['', Validators.required],
      precioDeVenta: [0],
      precioAlquilerMensual: [0],
      mesesFianza: [0],
      vivienda: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.type = parseInt(this.route.snapshot.params['type']);
    console.log(this.type);

    this.viviendaService.getViviendas().subscribe(
      (response) => {
        ;
        this.viviendas = this.viviendaService.extraerViviendas(response);
        ;
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
    ;

    this.submitted = true;

    const nuevaOfertaEntity = this.nuevaOfertaForm.value;
    ;
   /*  if (confirm('Revise los datos antes de aceptar')) { */
      ;
      if (!this.nuevaOfertaForm.invalid || true) {
        if (this.nuevaOfertaForm.value.type == 2) {
          const venta: VentaImpl = new VentaImpl(
            0,
            nuevaOfertaEntity.tituloOferta,
            nuevaOfertaEntity.precioDeVenta,
            nuevaOfertaEntity.url,
            nuevaOfertaEntity.vivienda


          );
          this.ventaService.create(venta).subscribe(
            () => {
              console.log('OK');
            },
            (error: any) => {
              console.error(error);
            }
          );
        } else {
          const alquiler: AlquilerImpl = new AlquilerImpl(
            0,
            nuevaOfertaEntity.tituloOferta,
            nuevaOfertaEntity.url,
            nuevaOfertaEntity.precioAlquilerMensual,
            nuevaOfertaEntity.mesesFianza,
            nuevaOfertaEntity.vivienda
          );
          this.alquilerService.create(alquiler).subscribe(
            () => {
              console.log('OK');
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

    console.warn('Your order has been submitted', customerData);
  }

  OnReset() {
    this.submitted = false;
    this.nuevaOfertaForm.reset();
  }

  cambiaTipo(event: any) {
    const val = event.currentTarget.value;
    console.log(this.nuevaOfertaForm.value.type);
    ;
    if (this.nuevaOfertaForm.value.type == 2) {
      this.nuevaOfertaForm = this.formBuilder.group({
        type: [this.nuevaOfertaForm.value.type, [Validators.required]],
        tituloOferta: [
          this.nuevaOfertaForm.value.tituloOferta,
          [Validators.required,
          Validators.maxLength(100),
          Validators.minLength(5),
        ]
        ],
        precioDeVenta: [
          this.nuevaOfertaForm.value.precioDeVenta,
          [Validators.required,
          Validators.maxLength(32),
          Validators.minLength(1),
          Validators.min(0),]
        ],
        precioAlquilerMensual: [],
        mesesFianza: [],
        vivienda: [this.nuevaOfertaForm.value.vivienda, [Validators.required]]
      });
    } else {
      this.nuevaOfertaForm = this.formBuilder.group({
        type: [this.nuevaOfertaForm.value.type, [Validators.required]],
        tituloOferta: [
          this.nuevaOfertaForm.value.tituloOferta,
          [Validators.required,
          Validators.maxLength(100),
          Validators.minLength(5)]
        ],
        precioDeVenta: [],
        precioAlquilerMensual: [
          this.nuevaOfertaForm.value.precioAlquilerMensual,
          [Validators.required,
          Validators.minLength(0),
          Validators.maxLength(10),
          Validators.min(0),]
        ],
        mesesFianza: [
          this.nuevaOfertaForm.value.mesesFianza,
          [Validators.required,
          Validators.min(0),
          Validators.max(12)]
        ],
        vivienda: [this.nuevaOfertaForm.value.vivienda, [Validators.required]]
      });
    }
  }
}
function customerData(arg0: string, customerData: any) {
  throw new Error('Function not implemented.');
}
