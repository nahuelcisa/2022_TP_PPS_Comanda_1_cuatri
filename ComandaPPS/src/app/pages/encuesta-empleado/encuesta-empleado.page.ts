import { Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-encuesta-empleado',
  templateUrl: './encuesta-empleado.page.html',
  styleUrls: ['./encuesta-empleado.page.scss'],
})
export class EncuestaEmpleadoPage implements OnInit {

  

  pregunta_1: boolean = true;
  pregunta_2: boolean = false;
  pregunta_3: boolean = false;
  pregunta_4: boolean = false;
  pregunta_5: boolean = false;

  progreso: any = 0.05;


  respuesta_1: any = 0;
  respuesta_2: any = "";
  respuesta_3: any = "";
  respuesta_4: any = "";
  respuesta_5: any = "";

  respuestas: any = {
    respuesta_1: "",
    respuesta_2: "",
    respuesta_3: "",
    respuesta_4: "",
    respuesta_5: ""
  }

  constructor(
    public toastController: ToastController,
    private as : AuthService,
    private fs : FirestoreService
  ) { }

  ngOnInit() {
  }
  async SuccessToastEncuesta() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Encuesta Enviada!!!',
      duration: 1100,
      color: 'success'
    });
    toast.present();
  }

  onSiguientePregunta(){
    if(this.pregunta_1){

      this.pregunta_1 = false;
      this.pregunta_2 = true;
      this.progreso = 0.2;
    }else if(this.pregunta_2){


      this.pregunta_2 = false;
      this.pregunta_3 = true;
      this.progreso = 0.4;
    }else if(this.pregunta_3){


      this.pregunta_3 = false;
      this.pregunta_4 = true;
      this.progreso = 0.6;
    }else if(this.pregunta_4){

      
      this.pregunta_4 = false;
      this.pregunta_5 = true;
      this.progreso = 0.8;
    }
  }

  onAnteriorPregunta(){
    if(this.pregunta_2){
      this.pregunta_2 = false;
      this.pregunta_1 = true;
      this.progreso = 0.05;
    }else if(this.pregunta_3){
      this.pregunta_3 = false;
      this.pregunta_2 = true;
      this.progreso = 0.2;
    }else if(this.pregunta_4){
      this.pregunta_4 = false;
      this.pregunta_3 = true;
      this.progreso = 0.4;
    }else if(this.pregunta_5){
      this.pregunta_5 = false;
      this.pregunta_4 = true;
      this.progreso = 0.6;
    }
  }


  funCapRespuesta1(event:any){
    //console.log(event);
    this.respuesta_1 = event;
  }

  funCapRespuesta2(event:any){
    //console.log(event);
    this.respuesta_2 = event;
  }

  funCapRespuesta3(event:any){
    //console.log(event);
    this.respuesta_3 = event;
  }

  funCapRespuesta4(event:any){
    //console.log(event);
    this.respuesta_4 = event;
  }

  funCapRespuesta5(event:any){
    //console.log(event);
    this.respuesta_5 = event;
  }


  onEnviarRespuestas(){
    this.respuestas = {
      respuesta_1: this.respuesta_1,
      respuesta_2: this.respuesta_2,
      respuesta_3: this.respuesta_3,
      respuesta_4: this.respuesta_4,
      respuesta_5: this.respuesta_5
    };  

    this.as.loading = true;

    //console.log(this.respuestas);

    this.fs.agregarEncuestaEmpleado(this.respuestas);  

    //console.log(this.respuestas);
    setTimeout(() => {               
      //Limpiando Atributos
      this.pregunta_1 = true;
      this.pregunta_2 = false;
      this.pregunta_3 = false;
      this.pregunta_4 = false;
      this.pregunta_5 = false;
      
      this.respuesta_1 = 0;
      this.respuesta_2 = "";
      this.respuesta_3 = "";
      this.respuesta_4 = "";
      this.respuesta_5 = "";  

      this.progreso = 0.05;
      this.as.loading = false;
      this.SuccessToastEncuesta();

    }, 2500);

    //console.log(this.respuestas);

  }

}
