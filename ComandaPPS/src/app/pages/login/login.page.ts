import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email : string = "";
  password : string = "";
  form : FormGroup;
  perfil

  clientes : any = [];

  constructor(private formBuilder : FormBuilder, private as : AuthService, private router : Router, private fs : FirestoreService,
    private toast : ToastController) 
  { 
    this.form = this.formBuilder.group({
      'email' : ['',[Validators.required,Validators.email]],
      'password' : ['',[Validators.required,Validators.minLength(6)]],  
    });

  }
  
  ngOnInit() {
    this.fs.traerUsuarios().subscribe(value => {
      this.clientes = value;
      this.clientes = this.clientes.filter(this.filtarHabilitado);
    });
  }

  filtarHabilitado(item){
    if(item.habilitado != "si"){
      return false;
    }else{
      return true;
    }
  }

  sonido(a : boolean){
    this.fs.sonido = a;
  }

  async DangerToastHabilitado() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'Cliente NO habilitado aún.!!!',
      duration: 1100,
      color: 'danger'
    });
    toast.present();
  }

  async DangerToastRechazado() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'Cliente RECHAZADO.!!!',
      duration: 1100,
      color: 'danger'
    });
    toast.present();
  }

  login()
  {

    this.email = this.form.get('email')?.value;
    this.password = this.form.get('password')?.value;

    let habilitado;

    for (const iterator of this.clientes) {
      console.log(iterator);
      if(iterator.email == this.email){
        habilitado = iterator.habilitado;
      }
    }

    console.log(habilitado);

    if(habilitado == "si"){
      this.as.login(this.email,this.password);
      setTimeout(() => {
        this.form.reset();
        if(this.fs.sonido){
        this.reproducirSonido("audioInicio3");
        }
      }, 5000);
    }else if(habilitado == "no"){
      if(this.fs.sonido){
      this.reproducirSonido("audioError");
      }
      this.DangerToastHabilitado();
    }else{
      if(this.fs.sonido){
        this.reproducirSonido("audioError");
        }
        this.DangerToastRechazado();
    }


  }

  cargarDatos(dato : number)
  {
    switch(dato)
    {
        case 1:
          this.email = "mozo@mozo.com";
          this.password = "123456";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
        case 2:
          this.email = "cocinero@cocinero.com";
          this.password = "123456";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
        case 3:
          this.email = "metre@metre.com";
          this.password = "123456";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
        case 4:
          this.email = "bartender@bartender.com";
          this.password = "123456";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
        case 5:
          this.router.navigate(['/alta-cliente']);
          break;
        case 6:
          this.router.navigate(['/alta-anonimo']);
          break;
        case 7:
          this.email = "nahuelcisa@hotmail.com";
          this.password = "123456";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
        case 8:
          this.email = "supervisor@supervisor.com";
          this.password = "supervisor123";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
    }
  }

  volverInicio()
  {  
    this.as.loading = true;

      setTimeout(() => {
        this.as.loading = false;
        this.router.navigate(['/home']);
        
      }, 1000);
    
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


