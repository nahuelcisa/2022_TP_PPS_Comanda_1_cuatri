import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { init } from "emailjs-com";
init("X8ztMRNkme_oaSn4i");

@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

  constructor() { }

  enviarAviso(usuario: any){
    let templateParams = {
      to_name: usuario.nombre,
      message: "Para poder acceder a la aplicación, debe aguardar que su cuenta sea verificada.",
      mailUsuario: usuario.email,
      from_name: "RestoBarPPSS"
    };

    emailjs.send("service_ggwht4c", "template_aychcoc", templateParams)
      .then(res =>{
        console.log("Email enviado.", res.status, res.text);
      })
      .catch(error =>{
        console.log("Error al enviar el email.", error);
      });
  }

  enviarAvisoHabilitado(usuario: any){
    let templateParams = {
      to_name: usuario.nombre,
      message: "Su cuenta ha sido verificada, ya puede ingresar a la aplicación.",
      mailUsuario: usuario.email,
      from_name: "RestoBarPPSS"
    };

    emailjs.send("service_ggwht4c", "template_aychcoc", templateParams)
      .then(res =>{
        console.log("Email enviado.", res.status, res.text);
      })
      .catch(error =>{
        console.log("Error al enviar el email.", error);
      });
  }

  enviarAvisoRechazado(usuario: any){
    let templateParams = {
      to_name: usuario.nombre,
      message: "Su cuenta ha sido RECHAZADA, no puede ingresar a la aplicación.",
      mailUsuario: usuario.email,
      from_name: "RestoBarPPSS"
    };

    emailjs.send("service_ggwht4c", "template_aychcoc", templateParams)
      .then(res =>{
        console.log("Email enviado.", res.status, res.text);
      })
      .catch(error =>{
        console.log("Error al enviar el email.", error);
      });
  }
}
