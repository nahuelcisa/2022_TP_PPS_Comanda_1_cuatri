import { Component, OnInit } from '@angular/core';
//import { PhotoService } from '../services/photo.service';
import {ToastController} from '@ionic/angular';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-alta-mesa',
  templateUrl: './alta-mesa.page.html',
  styleUrls: ['./alta-mesa.page.scss'],
})
export class AltaMesaPage implements OnInit, Food{
  public fotoSacada: boolean = false;

  public nroMesa: number;
  public cantComensales: number;
  public tipo: any;

  value: string;
  viewValue: string;

  tipos: Food[] = [
    {value: 'Vip', viewValue: 'Vip'},
    {value: 'Discapacitados', viewValue: 'Discapacitados'},
    {value: 'Estándar', viewValue: 'Estándar'},
  ];

  constructor(
    public toastController: ToastController
  ) { }



  async ErrorToast() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Ingrese todos los campos',
      duration: 1100,
      color: 'danger'
    });
    toast.present();
  }

  async ErrorToastNroMesa() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Ingrese nro de mesa',
      duration: 1100,
      color: 'danger'
    });
    toast.present();
  }

  async ErrorToastCantComensales() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Ingrese cantidad de comensales',
      duration: 1100,
      color: 'danger'
    });
    toast.present();
  }

  async ErrorToastTipo() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Ingrese tipo',
      duration: 1100,
      color: 'danger'
    });
    toast.present();
  }

  async ErrorToastFoto() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Agregar una Foto',
      duration: 1100,
      color: 'danger'
    });
    toast.present();
  }

  async SuccessToastMesa() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Mesa dada de Alta!!!',
      duration: 1100,
      color: 'success'
    });
    toast.present();
  }

  ngOnInit() {

  }

  onSubirFoto(){    
    //this.photoService.addNewToGallery();

    this.fotoSacada= true;
  }

  onAgregarMesa(){
    let todoOk: boolean = true;
 
    let tipo: boolean = true;
    let cantComensal: boolean = true;
    let nroMesa: boolean = true;
    let foto: boolean = true;
        
   if(!this.fotoSacada){
     this.ErrorToastFoto();
     todoOk = false;
     foto = false;
   }
 
   if(this.tipo == null || this.tipo == undefined || this.tipo == ""){
     this.ErrorToastTipo();   
     todoOk = false;   
     tipo = false;
   }
 
   if(this.cantComensales == null || this.cantComensales == undefined || !(this.cantComensales > 0)){
     this.ErrorToastCantComensales();
     todoOk = false;
     cantComensal = false;
   }
 
   if(this.nroMesa == null || this.nroMesa == undefined || !(this.nroMesa > 0))
   {
     this.ErrorToastNroMesa();
     todoOk = false;
     nroMesa = false;
   }
 
 
   if(!tipo && !cantComensal && !nroMesa && !foto){
     this.ErrorToast();
   }
 
     if(todoOk){
       this.SuccessToastMesa();
     }
   }

   
   cargarDatos(dato : number)
  {
    switch(dato)
    {
        case 1:
          this.tipo = "Vip";
          break;
        case 2:
          this.tipo = "Discapacitados";
          break;
        case 3:
          this.tipo = "Estándar";
          break;
    }
  }
}
