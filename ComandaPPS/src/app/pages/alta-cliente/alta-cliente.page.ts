import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { uploadString } from 'firebase/storage';
import { Cliente } from 'src/app/interfaces/cliente';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { MailServiceService } from 'src/app/services/mail-service.service';
import { PushService } from 'src/app/services/push-service.service';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.page.html',
  styleUrls: ['./alta-cliente.page.scss'],
})
export class AltaClientePage implements OnInit {

  perfil : string = "anonimo";
  form : FormGroup;
  cliente : Cliente;
  foto : any;
  capturedPhoto : any = "";
  url : any = "";
  storage : any;
  fotoSubida : boolean = false;
  webPath : string = "";

  constructor(private formBuilder : FormBuilder, private fs : FirestoreService, private as : AuthService, private router : Router,private sf : ScannerService, private imageStore : ImagenesService, private MS : MailServiceService, private push : PushService) 
  { 
  
    this.form = this.formBuilder.group({
      'nombre' : ['',[Validators.required,Validators.minLength(2)]],
      'apellido' : ['',[Validators.required,Validators.minLength(2)]],
      'dni' : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      'email' : ['',[Validators.required,Validators.email]],
      'password' : ['',[Validators.required,Validators.minLength(6)]]
    });
    
  }

  ngOnInit() {
  }

  altaCliente()
  {
    this.as.loading = true;
       
    this.fs.usuario = this.cliente;
    this.fs.agregarCliente(this.cliente);
    this.sendPush();

    this.MS.enviarAviso(this.cliente);
    
    setTimeout(() => {
        this.form.reset(); 
        this.fotoSubida = false;
        this.as.loading = false;
        this.webPath = "";
        if(this.fs.sonido){
          this.reproducirSonido("audioInicio");
        }
        this.router.navigate(['/login']);
    }, 2500);

  }

  agregarFoto()
  { 
    this.cliente = {
      nombre : this.form.get('nombre')?.value,
      apellido : this.form.get('apellido')?.value,
      DNI : this.form.get('dni')?.value,
      foto : "",
      email : this.form.get('email')?.value,
      clave : this.form.get('password')?.value,
      habilitado : false,
      encuesta : null,
      perfil : "cliente",
      mesa : 0,
      juegoJugado: false,
      descuento: ""
    };
    this.imageStore.addNewToGallery(this.cliente).then((data) =>{
      this.as.loading = true;
      this.storage = data.storage;
      this.url = data.url;
      this.capturedPhoto = data.capturedPhoto;
      this.fotoSubida = true;
      uploadString(this.storage,this.capturedPhoto.dataUrl, 'data_url').then((data) =>{    
        this.url.getDownloadURL().subscribe((url1 : any)=>{
          this.webPath = url1;
          this.cliente.foto = url1;
          setTimeout(() => {
            this.as.loading = false;
          }, 2000);
        });
      });
    });

  }

  leerDNI()
  {
    let datos : any = [];
    let nombre : string;
    let apellido : string;
    let nombreFinal : string;
    let apellidoFinal : string;
    this.sf.test().then((data) => {
      
      datos = data.split('@');
      nombre = datos[2];
      apellido = datos[1];
      nombreFinal = nombre[0];
      apellidoFinal = apellido[0];
      
      for(let i = 1; i < nombre.length; i++)
      {
        if(nombre[i-1] == " ")
        {
          nombreFinal = nombreFinal + nombre[i].toUpperCase();
        }
        else
        {
          nombreFinal = nombreFinal + nombre[i].toLowerCase();
        }

      }

      for(let i = 1; i < apellido.length; i++)
      {
        if(apellido[i-1] == " ")
        {
          apellidoFinal = apellidoFinal + apellido[i].toUpperCase();
        }
        else
        {
          apellidoFinal = apellidoFinal + apellido[i].toLowerCase();
        }
      }


      this.form.get('apellido')?.setValue(apellidoFinal);
      this.form.get('nombre')?.setValue(nombreFinal);
      this.form.get('dni')?.setValue(datos[4]);
      this.sf.stopScan();
    })
  }

  sendPush() {
    console.log("asd");
    this.push
      .sendPushNotification({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        registration_ids: [
          // eslint-disable-next-line max-len
          'f5VPIwXvRVSXodIjAeLLho:APA91bHeqPI7nlKpd0n3CbxhjifzTZ2jXVOtxwg_x-4qtgb1fVPjEet5PXfIxjNvHxRytOmT1qb2kJji85J5A_dJLt09kaz9hbD2hmH2a7xy1Sz2LboAcIjNSn-bp5q05C1CeLFU2QUe',
        ],
        notification: {
          title: 'Nuevo cliente',
          body: 'Hay un nuevo cliente esperando a ser habilitado.',
        },
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  reproducirSonido(dato : string)
  {
    let ruta : string = '../../../assets/sonidos/';
    let nombreArchivo : string = "";
    let audioNombre : string = "";

    audioNombre = dato + ".mp3"; 
    nombreArchivo = ruta + audioNombre;

    this.reproducir(nombreArchivo);
           
  }

  reproducir(ruta : string)
  {
    let audio = new Audio(ruta);
    audio.play();   
  }
}
