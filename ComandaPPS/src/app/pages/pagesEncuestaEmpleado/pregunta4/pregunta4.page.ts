import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-pregunta4',
  templateUrl: './pregunta4.page.html',
  styleUrls: ['./pregunta4.page.scss'],
})
export class Pregunta4Page implements OnInit {

  @Output() respuesta4 = new EventEmitter();

  si: boolean;
  no: boolean;

  valorRespuesta: any; //Capturo el valor

  constructor() { }

  ngOnInit() {
  }

  onValorCapturado(value: any){
    
    if(value == 1){
      this.si = false;
      this.no = false;
      this.valorRespuesta = "Si";
    }else if(value == 2){
      this.si = false;
      this.no = false;
      this.valorRespuesta = "No";
    }

    this.respuesta4.emit(this.valorRespuesta);
    this.valorRespuesta = "";
  }
}
