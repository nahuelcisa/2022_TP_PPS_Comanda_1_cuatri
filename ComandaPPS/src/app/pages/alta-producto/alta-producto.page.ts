import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { uploadString } from 'firebase/storage';
import { Producto } from 'src/app/clases/producto';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ImagenesService } from 'src/app/services/imagenes.service';

import html2canvas from "html2canvas";

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.page.html',
  styleUrls: ['./alta-producto.page.scss'],
})
export class AltaProductoPage implements OnInit {

  form : FormGroup;
  productoAgregar : Producto;
  foto1Subida : boolean = false;
  foto2Subida : boolean = false;
  foto3Subida : boolean = false;
  storage : any;
  url : any;
  capturedPhoto : any;
  webPath : string[];
  producto : Producto;
  contador : number = 0;
  qrData : string = "@";
  storageQR : any;
  urlQR : any;

  constructor(private as : AuthService, private fs : FirestoreService, private formBuilder : FormBuilder, private imageStore : ImagenesService, private toastController : ToastController) 
  {
    this.form = this.formBuilder.group({
      'nombre' : ['',[Validators.required,Validators.minLength(2)]],
      'descripcion' : ['',[Validators.required,Validators.minLength(4)]],
      'tiempo' : ['',[Validators.required, Validators.min(5),Validators.max(25)]],
      'precio' : ['',[Validators.required,Validators.min(600),Validators.max(1500)]]
    });

    this.webPath = [];
    this.producto = new Producto();
  }
 

  ngOnInit(){
    
  }

  altaProducto()
  {
    this.as.loading = true;
    this.crearImagen();
    setTimeout(() => {
      this.fs.agregarProducto(this.producto)
        this.as.loading = false;
        this.MostrarToast("El producto ha sido agregado").then((toast : any) =>{
          toast.present();
        });
        this.form.reset(); 
        this.webPath = [];
        this.contador = 0;     
        this.producto = new Producto();
      }, 6000);
  }

  agregarFotos()
  {
    this.producto.nombre = this.form.get('nombre')?.value;
    this.producto.descripcion = this.form.get('descripcion')?.value;
    this.producto.tiempoPromedio = this.form.get('tiempo')?.value;
    this.producto.precio = this.form.get('precio')?.value;
   /*  this.producto = {
      nombre : this.form.get('nombre')?.value,
      descripcion : this.form.get('descripcion')?.value,
      tiempoPromedio : this.form.get('tiempo')?.value,
      precio : this.form.get('precio')?.value,
    }; */
      this.imageStore.addNewToGallery(this.producto).then((data) =>{
        this.as.loading = true;
        this.storage = data.storage;
        this.url = data.url;
        this.capturedPhoto = data.capturedPhoto;
     
        uploadString(this.storage,this.capturedPhoto.dataUrl, 'data_url').then((data) =>{    
          this.url.getDownloadURL().subscribe((url1 : any)=>{
            console.log(this.webPath.length);
            this.webPath.push(url1);
            console.log(this.webPath.length);
           if(this.webPath.length == 1)
           {
            this.producto.foto1 = url1;
            
           }
           else
           {
             if(this.webPath.length == 2)
             {
              this.producto.foto2 = url1;
      
             }
             else{
              this.producto.foto3 = url1;
              this.qrData += "Nombre: "+this.producto.nombre+ "\n" +"@Descripcion: "+this.producto.descripcion+ "\n"+"@TiempoPreparacion: "+this.producto.tiempoPromedio+"\n"+"@Precio: "+this.producto.precio;          
            }
           }
             setTimeout(() => {
               this.as.loading = false;
             }, 2000);

          });
        });
      });
    }

    MostrarToast(message : string)
    {
      return this.toastController.create({
              header: 'Producto agregado',
              message: message,
              buttons: ['Ok'],
              position: 'top',
              color: 'success'
      });
    }

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
        this.urlQR= data.url;
        //console.log(data.url);
  
        uploadString(this.storageQR, dataUrlQR, 'data_url').then((snapshot) => {
          this.urlQR.getDownloadURL().subscribe((urlqr: any)=>{
              //Obtengo URL DE QR
              this.producto.qr = urlqr;        
          });
        });      
      });    
    }
  }
