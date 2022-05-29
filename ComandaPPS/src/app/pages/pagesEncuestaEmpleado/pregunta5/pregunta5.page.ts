import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pregunta5',
  templateUrl: './pregunta5.page.html',
  styleUrls: ['./pregunta5.page.scss'],
})
export class Pregunta5Page implements OnInit {

  @Output() respuesta5 = new EventEmitter();

  valor_respuesta: any;

  constructor() { }

  ngOnInit() {
  }

  cargarRespuesta(value : any){

    switch (value) {
      case 1:        
        document.getElementById("respuesta").setAttribute('value',"No");
        this.valor_respuesta = "No";
        break;
      case 2:
        document.getElementById("respuesta").setAttribute('value',"Muchos");
        this.valor_respuesta = "Muchos";
        break;
      case 3:
        document.getElementById("respuesta").setAttribute('value',"Pocos");
        this.valor_respuesta = "Pocos";
        break;
    }   
    
    this.respuesta5.emit(this.valor_respuesta);
    this.valor_respuesta = "";
  }

}
