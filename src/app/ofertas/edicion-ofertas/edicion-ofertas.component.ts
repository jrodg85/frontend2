import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlquilerImpl } from '../models/alquiler-impl';
import { VentaImpl } from '../models/venta-impl';
import { AlquilerService } from '../service/alquiler.service';
import { VentaService } from '../service/venta.service';

@Component({
  selector: 'app-edicion-ofertas',
  templateUrl: './edicion-ofertas.component.html',
  styleUrls: ['./edicion-ofertas.component.css']
})
export class EdicionOfertasComponent implements OnInit {
  public ofertaForm: FormGroup;
  type: number = 0;
  id: number = 0;
  idVivienda: number=0;

  constructor(private route: ActivatedRoute,
    private router:Router,
    private formBuilder: FormBuilder,
    private ventaService: VentaService,
    private alquilerService: AlquilerService) {
      this.ofertaForm = this.formBuilder.group({
        tituloOferta: ['', Validators.required],
        precioDeVenta: [0],
        precioAlquilerMensual: [0],
        mesesFianza: [0]
      })
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.idVivienda = this.route.snapshot.params['idVivienda'];

    this.type = parseInt(this.route.snapshot.params['type']);
    console.log(this.id);
    console.log(this.type);

    if(this.type === 2){


    this.ventaService.findById(this.id).subscribe(
      (service)=>{
        console.log(service);
        this.ofertaForm = this.formBuilder.group({
          tituloOferta: [service.tituloOferta, Validators.required],
          precioDeVenta: [service.precioDeVenta, Validators.required],
        });
      },
    (error)=> {
      console.error(error);
    });
    }else{


      this.alquilerService.findById(this.id).subscribe(
        (service)=>{
          ;
          console.log(service);

          this.ofertaForm = this.formBuilder.group({
            tituloOferta: [service.tituloOferta, Validators.required],
            precioAlquilerMensual: [service.precioAlquilerMensual, Validators.required],
            mesesFianza: [service.mesesFianza, Validators.required],
          });
        },
      (error)=> {
        console.error(error);
      });
    }
  }

  public onSubmit() {

    const ofertaEntity = this.ofertaForm.value;
    if (!this.ofertaForm.invalid) {
      if (this.type == 2) {
        const venta: VentaImpl = new VentaImpl(
          this.id,
          ofertaEntity.tituloOferta,
          ofertaEntity.vivienda,
          ofertaEntity.urlVivienda,
          ofertaEntity.precioDeVenta,
        )

          this.ventaService.update(venta,this.id ).subscribe(
            () => {
              console.log('OK');
              this.goTo();

            },
            (error:any) => {
              console.error(error);
            }
          );
      } else {
        const alquiler: AlquilerImpl = new AlquilerImpl(
          this.id,
          ofertaEntity.tituloOferta,
          ofertaEntity.vivienda,
          ofertaEntity.urlVivienda,
          ofertaEntity.precioAlquilerMensual,
          ofertaEntity.mesesFianza,

        );
        this.alquilerService.update(alquiler, this.id).subscribe(
          () => {

            console.log('OK');
            this.goTo()

          },
          (error:any) => {
            console.error(error);
          }
        )
      }
    }
  }
public goTo(){
  if(this.idVivienda){
    this.router.navigate([`ofertas/ofertas-vivienda/${this.idVivienda}`]);

  }else
    this.router.navigate(['ofertas']);
}
}



