import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  public viviendas: ViviendaImpl[] = [];

  //public empleadoNombre:

  public tipos: Tipo[] = [
    { id: 0, description: 'Seleccione tipo de Oferta' },
    { id: 1, description: 'OFERTA_DE_ALQUILER' },
    { id: 2, description: 'OFERTA_DE_VENTA' },
  ];

  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private viviendaService: ViviendaService,
    private ventaService: VentaService,
    private alquilerService: AlquilerService
  ) {
    this.ofertaForm = this.formBuilder.group({
      type: ['', Validators.required],
      tituloOferta: ['', Validators.required],
      precioVenta: [0],
      precioAlquilerMensual: [0],
      mesesFianza: [0],
      vivienda: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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
    return this.ofertaForm.controls;
  }

  public onSubmit() {
    ;

    this.submitted = true;

    const servicioEntity = this.ofertaForm.value;
    ;
   /*  if (confirm('Revise los datos antes de aceptar')) { */
      ;
      if (!this.ofertaForm.invalid || true) {
        if (this.ofertaForm.value.type == 2) {
          const venta: VentaImpl = new VentaImpl(
            0,
            servicioEntity.tituloOferta,
            servicioEntity.precioVenta,
            servicioEntity.url,
            servicioEntity.vivienda


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
            servicioEntity.tituloOferta,
            servicioEntity.url,
            servicioEntity.precioAlquilerMensual,
            servicioEntity.mesesFianza,
            servicioEntity.vivienda
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
    if (this.ofertaForm.invalid) {
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
    this.ofertaForm.reset();
  }

  cambiaTipo(event: any) {
    const val = event.currentTarget.value;
    console.log(this.ofertaForm.value.type);
    ;
    if (this.ofertaForm.value.type == 2) {
      this.ofertaForm = this.formBuilder.group({
        type: [this.ofertaForm.value.type, [Validators.required]],
        tituloOferta: [
          this.ofertaForm.value.tituloOferta,
          [Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ]
        ],
        precioVenta: [
          this.ofertaForm.value.precioVenta,
          [Validators.required,
          Validators.maxLength(0),
          Validators.minLength(10)]
        ],
        precioAlquilerMensual: [],
        mesesFianza: [],
        vivienda: [this.ofertaForm.value.vivienda, [Validators.required]]
      });
    } else {
      this.ofertaForm = this.formBuilder.group({
        type: [this.ofertaForm.value.type, [Validators.required]],
        tituloOferta: [
          this.ofertaForm.value.tituloOferta,
          [Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10)]
        ],
        precioVenta: [],
        precioAlquilerMensual: [
          this.ofertaForm.value.precioAlquilerMensual,
          [Validators.required,
          Validators.min(0),
          Validators.max(10)]
        ],
        mesesFianza: [
          this.ofertaForm.value.mesesFianza,
          [Validators.required,
          Validators.min(0),
          Validators.max(10)]
        ],
        vivienda: [this.ofertaForm.value.vivienda, [Validators.required]]
      });
    }
  }
}
function customerData(arg0: string, customerData: any) {
  throw new Error('Function not implemented.');
}

