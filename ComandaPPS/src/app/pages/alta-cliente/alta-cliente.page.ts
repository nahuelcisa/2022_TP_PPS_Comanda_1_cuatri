import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { uploadString } from 'firebase/storage';
import { Cliente } from 'src/app/interfaces/cliente';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ScannerService } from 'src/app/services/scanner.service';

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

  constructor(private formBuilder : FormBuilder, private fs : FirestoreService, private as : AuthService, private router : Router,private sf : ScannerService, private imageStore : ImagenesService) 
  { 
    if(this.perfil == "anonimo")
    {
      this.form = this.formBuilder.group({
        'nombre' : ['',[Validators.required,Validators.minLength(2)]],
        'apellido' : [' '],
        'dni' : [' '],
      });
    }
    else
    {
      this.form = this.formBuilder.group({
        'nombre' : ['',[Validators.required,Validators.minLength(2)]],
        'apellido' : ['',[Validators.required,Validators.minLength(2)]],
        'dni' : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      });
    }
  }

  ngOnInit() {
  }

  altaCliente()
  {
    this.as.loading = true;
       
    this.fs.agregarCliente(this.cliente)
    
    setTimeout(() => {
        this.form.reset(); 
        this.fotoSubida = false;
        this.as.loading = false;
        this.webPath = "";
      }, 2500);

  }

  agregarFoto()
  { 
    this.cliente = {
      nombre : this.form.get('nombre')?.value,
      apellido : this.form.get('apellido')?.value,
      DNI : this.form.get('dni')?.value,
      foto : ""
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
}
