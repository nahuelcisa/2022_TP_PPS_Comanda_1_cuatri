import { Component, OnInit } from '@angular/core';
//import { PhotoService } from '../services/photo.service';
import { uploadString } from 'firebase/storage';
import {ToastController} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import {Mesa} from '../../interfaces/mesa';
import { FirestoreService } from 'src/app/services/firestore.service';


import html2canvas from "html2canvas";
import { Console } from 'console';

@Component({
  selector: 'app-alta-mesa',
  templateUrl: './alta-mesa.page.html',
  styleUrls: ['./alta-mesa.page.scss'],
})
export class AltaMesaPage implements OnInit{
  
  qrDate: any = "@";
  webPathQR : string = "";
  storageQR:any;
  urlQR: any ="";

  fotoSacada: boolean = false;
  nroMesa: number;
  cantComensales: number;
  tipo: any;

  mesa : Mesa;

  Qr: any;
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
    this.mesa = {
      nroMesa: this.nroMesa,
      cantComensales: this.cantComensales,
      tipo: this.tipo,
      foto: "",
      Qr: "",
      ocupada: false
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

       //Genero QR en div con los datos necesarios
       this.qrDate += "NroMesa:"+this.nroMesa+"@CantComens:"+this.cantComensales+"@Tipo:"+this.tipo; 

       //Creo la Imagen y lo subo a Firebase  espero 500mls para que carque los datos al qrDate
       setTimeout(() => {
        this.crearImagen();
       }, 500);
       

      setTimeout(() => {            
          this.mesa = {
            nroMesa: this.nroMesa,
            cantComensales: this.cantComensales,
            tipo: this.tipo,
            foto: this.webPath,
            Qr: this.webPathQR,
            ocupada: false
          };  
    
          this.fs.agregarMesa(this.mesa);


          // console.log("Datos Mesa a Subir");
          // console.log("Nro Mesa: "+this.nroMesa);
          // console.log("Cant Comensales: "+this.cantComensales);
          // console.log("Tipo: "+this.tipo);
          // console.log("Url Foto: "+this.webPath);
          // console.log("Url Foto QR: "+this.webPathQR);


          this.nroMesa = 0;
          this.cantComensales = 0;
          this.tipo = "";

          this.fotoSubida = false;
          this.as.loading = false;
          this.webPath = "";
          this.webPathQR = "";
          this.SuccessToastMesa();
        }, 6000);
        //Espero 6seg a q cargue la URL del qr (Tarda )
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



  //Genero Img QR y lo subo a firebase segun el div(contenido)
  imagenQRGenerado: any;
  imgcreada = false;
  imagenCreada;
  crearImagen() {
    html2canvas(document.querySelector("#contenido")).then(canvas => {
 
      this.imagenCreada = canvas.toDataURL();      
      this.imagenQRGenerado = this.imagenCreada;
      
      //Ahora tengo q llamar A subirFotoQR para subir la IMG a Firebas     
      this.onSubirFotoQR(this.imagenQRGenerado);
    });
    this.imgcreada = true;
  }  


  //Subo Img a Firebase
  onSubirFotoQR(dataUrlQR){    
    this.imageStore.addFotoQR().then((data) =>{   
      this.storageQR = data.storage;
      this.urlQR = data.url;
      //console.log(data.url);

      uploadString(this.storageQR, dataUrlQR, 'data_url').then((snapshot) => {
        this.urlQR.getDownloadURL().subscribe((urlqr: any)=>{
            //Obtengo URL DE QR
            this.webPathQR = urlqr;            
        });
      });      
    });    
  }
  
}
