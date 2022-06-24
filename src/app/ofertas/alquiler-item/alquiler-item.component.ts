import { Component, Input, OnInit } from '@angular/core';
import { AlquilerImpl } from '../models/alquiler-impl';

@Component({
  selector: 'app-alquiler-item',
  templateUrl: './alquiler-item.component.html',
  styleUrls: ['./alquiler-item.component.css']
})
export class AlquilerItemComponent implements OnInit {
  @Input() alquiler: AlquilerImpl = new AlquilerImpl(0,"","","",0,0);
  constructor() { }

  ngOnInit(): void {
  }

}
