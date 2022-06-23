import { Component, Input, OnInit } from '@angular/core';
import { VentaImpl } from '../models/venta-impl';

@Component({
  selector: 'app-venta-item',
  templateUrl: './venta-item.component.html',
  styleUrls: ['./venta-item.component.css']
})
export class VentaItemComponent implements OnInit {
  @Input() venta: VentaImpl = new VentaImpl(0,"","","",0);

  constructor() { }

  ngOnInit(): void {
  }

}
