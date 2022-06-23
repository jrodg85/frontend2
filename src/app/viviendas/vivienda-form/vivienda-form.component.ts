import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ViviendaImpl } from '../models/vivienda-impl';
import { ViviendaService } from '../service/vivienda.service';

@Component({
  selector: 'app-vivienda-form',
  templateUrl: './vivienda-form.component.html',
  styleUrls: ['./vivienda-form.component.css']
})
export class ViviendaFormComponent implements OnInit {
  private host: string = environment.host;
  private urlEndPoint: string = `${this.host}viviendas`;
  public vivienda : ViviendaImpl = new ViviendaImpl(0,"","","","",0,"",0,[],"");



  constructor(
    private viviendaService: ViviendaService,
    private http: HttpClient,

  ) {
  }

  ngOnInit(): void {
  }

  create(): void {
    this.viviendaService.postVivienda(this.vivienda);

}

public onSubmit(){
  this.http.post(this.urlEndPoint, this.vivienda).subscribe();
}

}
