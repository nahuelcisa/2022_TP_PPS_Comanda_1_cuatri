import { Component, OnInit } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.scss'],
})
export class PiedraPapelTijeraComponent implements OnInit {


  scoreNuevo: any = "";
  scores: any = [0,0];

  respuestaRestobar:boolean = false;
  piedraRB: boolean = false;
  papelRB: boolean = false;
  tijeraRB: boolean = false;

  respuestaCliente: any;
  piedraCL: boolean = false;
  papelCL: boolean = false;
  tijeraCL: boolean = false;

  yaJugo: boolean = false;

  loading: boolean = false;

  descuento: any;
  
  constructor() { }

  ngOnInit() {}

  pick(value: any){

    if(this.scores[0] != 5 && this.scores[1] != 5){
      switch (value) {
        case 0:
          //Piedra
          document.getElementById("piedra").classList.add('pickCliente'); 
          document.getElementById("papel").classList.remove('pickCliente'); 
          document.getElementById("tijera").classList.remove('pickCliente');          
          this.piedraCL = true;
          break;
        case 1:
          //Papel
          document.getElementById("papel").classList.add('pickCliente'); 
          document.getElementById("piedra").classList.remove('pickCliente'); 
          document.getElementById("tijera").classList.remove('pickCliente');   
          this.papelCL = true;
          break;
        case 2:
          //Tijera
          document.getElementById("tijera").classList.add('pickCliente'); 
          document.getElementById("papel").classList.remove('pickCliente'); 
          document.getElementById("piedra").classList.remove('pickCliente');   
          this.tijeraCL = true;
        break;
      }
  
      this.respuestaCliente = value;
  

      if(this.scores[0] != 5 && this.scores[1] != 5){
        this.loading = true;
        this.respuestaRestobar = false;
        setTimeout(() => {  
          this.repuestaRB(); 

          this.loading = false;
          this.respuestaRestobar = true;   
                    
          this.mejorDe5();


          if(this.scores[0] == 5){            
            this.calcularDescuento();
            
            this.alert('success', 'Ganaste un ' + this.descuento + '% de descuento!');  
            this.yaJugo = true;  
          }else if(this.scores[1] == 5){
            this.calcularDescuento();
            this.alert('error', 'Perdiste!');
            this.yaJugo = true;  
          }
        }, 1000);        
      }
  
    }else{
      this.alert('info', 'Reinicie el Juego para seguir jugando');
    }
   
  }

  calcularDescuento(){

    if(this.scores[0] == 5 && this.scores[1] == 0){
      this.descuento = 20;
    }else if(this.scores[0] == 5 && this.scores[1] == 1){
      this.descuento = 15;
    }else if((this.scores[0] == 5 && this.scores[1] == 2) || (this.scores[0] == 5 && this.scores[1] == 3)){
      this.descuento = 10;
    }else if(this.scores[0] == 5 && this.scores[1] == 4){
      this.descuento = 5;
    }else{
      this.descuento = 0;
    }
  }

  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,

      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: text
    })
  }

  repuestaRB(){
    let PPT = Math.floor(Math.random() * 3);

    this.resetRespuestasRB();

    this.respuestaRestobar = true;
    switch (PPT) {
      case 0:
        //Piedra
        this.piedraRB = true;
        break;
      case 1:
        //Papel
        this.papelRB = true;
        break;
      case 2:
        //Tijera
        this.tijeraRB = true;
      break;
    }
  }


  onRestart(){
    this.respuestaRestobar = false;
    this.resetRespuestasCL();
    this.resetRespuestasRB();

    this.scores = [0,0];

    document.getElementById("piedra").classList.remove('pickCliente'); 
    document.getElementById("papel").classList.remove('pickCliente'); 
    document.getElementById("tijera").classList.remove('pickCliente'); 

    this.alert('success', 'Juego Reiniciado');
  }

  resetRespuestasRB(){
    this.respuestaRestobar = false;
    this.piedraRB = false;
    this.papelRB = false;
    this.tijeraRB = false;
  }

  resetRespuestasCL(){
    this.respuestaCliente = false;
    this.piedraCL = false;
    this.papelCL = false;
    this.tijeraCL = false;
  }

  mejorDe5(){

    // console.log("Respuestas");
    // console.log(this.piedraCL);
    // console.log(this.papelCL);
    // console.log(this.tijeraCL);
    // console.log("_____");
    // console.log(this.piedraRB);
    // console.log(this.papelRB);
    // console.log(this.tijeraRB);

    if(this.piedraCL){
      if(this.piedraRB){
        //== No sumo puntos a ninguno
      }else if(this.papelRB){
        //-- Puntos
        this.scores[1]++; 
      }else if(this.tijeraRB){
        //++ Puntos
        this.scores[0]++;
      }
    }else if(this.papelCL){
      if(this.piedraRB){
        //++ Puntos
        this.scores[0]++;
      }else if(this.papelRB){
        //== No sumo puntos a ninguno
      }else if(this.tijeraRB){
        //-- Puntos
        this.scores[1]++; 
      }
    }else if(this.tijeraCL){
      if(this.piedraRB){
        //-- Puntos
        this.scores[1]++; 
      }else if(this.papelRB){
        //++ Puntos
        this.scores[0]++;
      }else if(this.tijeraRB){
        //== No sumo puntos a ninguno
      }
    }  
    
    this.resetRespuestasCL();
  }
}
