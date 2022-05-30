import { Component, OnInit } from '@angular/core';
//import { PhotoService } from '../services/photo.service';
import { uploadString } from 'firebase/storage';
import {ToastController} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import {Mesa} from '../../interfaces/mesa';
import { FirestoreService } from 'src/app/services/firestore.service';

import { SafeUrl } from "@angular/platform-browser";


@Component({
  selector: 'app-alta-mesa',
  templateUrl: './alta-mesa.page.html',
  styleUrls: ['./alta-mesa.page.scss'],
})
export class AltaMesaPage implements OnInit, Mesa{
  
  public myAngularxQrCode: string = null;
  public qrCodeDownloadLink: SafeUrl = "";
  QrGenerado: boolean = false;
  qrOculto: boolean = false;

  fotoSacada: boolean = false;
  nroMesa: number;
  cantComensales: number;
  tipo: any;
  codigoQR: any;

  mesa : Mesa;

  foto : any;
  webPath : string = "";
  storage : any;
  url : any = "";
  capturedPhoto : any = "";
  fotoSubida : boolean = false;


  constructor(
    public toastController: ToastController,
    private imageStore : ImagenesService,
    private as : AuthService,
    private fs : FirestoreService
  ) {
    this.myAngularxQrCode = 'QR';
  }
  


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
    this.mesa = {
      nroMesa: this.nroMesa,
      cantComensales: this.cantComensales,
      tipo: this.tipo,
      foto: "",
      codigoQR: ""
    };

    this.imageStore.addFotoMesa(this.mesa).then((data) =>{
      this.as.loading = true;
      this.storage = data.storage;
      this.url = data.url;
      this.capturedPhoto = data.capturedPhoto;
      this.fotoSubida = true;
      uploadString(this.storage,this.capturedPhoto.dataUrl, 'data_url').then((data) =>{    
        this.url.getDownloadURL().subscribe((url1 : any)=>{
          this.webPath = url1;
          this.mesa.foto = url1;
          setTimeout(() => {
            this.as.loading = false;
          }, 2000);
        });
      });
    });    
  }


  onAgregarMesa(){
    let todoOk: boolean = true;
 
    let val_tipo: boolean = true;
    let val_cantComensal: boolean = true;
    let val_nrMesa: boolean = true;
    let val_foto: boolean = true;
        
   if(this.webPath == ""){
     this.ErrorToastFoto();
     todoOk = false;
     val_foto = false;
   }
 
   if(this.tipo == null || this.tipo == undefined || this.tipo == ""){
     this.ErrorToastTipo();   
     todoOk = false;   
     val_tipo = false;
   }
 
   if(this.cantComensales == null || this.cantComensales == undefined || !(this.cantComensales > 0)){
     this.ErrorToastCantComensales();
     todoOk = false;
     val_cantComensal = false;
   }
 
   if(this.nroMesa == null || this.nroMesa == undefined || this.nroMesa <= 0)
   {
     this.ErrorToastNroMesa();
     todoOk = false;
     val_nrMesa = false;
   }
 
 
   if(!val_tipo && !val_cantComensal && !val_nrMesa && !val_foto){
     this.ErrorToast();
   }
 

    if(todoOk){
      this.as.loading = true;
      

      this.mesa = {
        nroMesa: this.nroMesa,
        cantComensales: this.cantComensales,
        tipo: this.tipo,
        foto: this.webPath,
        codigoQR: ""
      };  


      this.myAngularxQrCode += "Nro mesa: "+this.nroMesa+
                               " - Cantidad Comensales: "+this.cantComensales+
                               " - Tipo: "+this.tipo+
                               " - Foto: "+this.webPath;

      this.onChangeURL(this.myAngularxQrCode);//Genero QR con datos Mesa
      this.mesa.codigoQR = this.qrCodeDownloadLink;
      
      console.log(this.mesa);
      //this.fs.agregarMesa(this.mesa);
      
      setTimeout(() => {               
          this.nroMesa = 0;
          this.cantComensales = 0;
          this.tipo = "";

          this.fotoSubida = false;
          this.as.loading = false;
          this.webPath = "";
          this.qrCodeDownloadLink = "";
          this.SuccessToastMesa();
        }, 2500);
      }

      this.QrGenerado =true;
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
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
