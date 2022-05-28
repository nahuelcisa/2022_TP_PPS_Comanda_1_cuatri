import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private formBuilder : FormBuilder, private as : AuthService, private router : Router) 
  { 
    this.form = this.formBuilder.group({
      'email' : ['',[Validators.required,Validators.email]],
      'password' : ['',[Validators.required,Validators.minLength(6)]],  
    });
  }

  ngOnInit() {
  }

  login()
  {
    this.email = this.form.get('email')?.value,
    this.password = this.form.get('password')?.value 
    this.as.login(this.email,this.password);

    setTimeout(() => {
      this.form.reset();
    }, 5000);
  }

  cargarDatos(dato : number)
  {
    switch(dato)
    {
        case 1:
          this.email = "mozo@mozo.com";
          this.password = "mozo123";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
        case 2:
          this.email = "cocinero@cocinero.com";
          this.password = "cocinero123";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
        case 3:
          this.email = "metre@metre.com";
          this.password = "metre123";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
        case 4:
          this.email = "bartender@bartender.com";
          this.password = "bartender123";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
        case 5:
          this.email = "registrado@registrado.com";
          this.password = "registrado123";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
        case 6:
          this.email = "anonimo@anonimo.com";
          this.password = "anonimo123";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
        case 7:
          this.email = "duenio@duenio.com";
          this.password = "dueño123";
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

}


