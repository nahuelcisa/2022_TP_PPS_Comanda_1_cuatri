import { PathLocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { getStorage, ref, uploadString } from "firebase/storage"
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(public as : AuthService, private afs : AngularFireStorage, private fs : FirestoreService) { }

  public async addNewToGallery(usuario : any) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
      webUseInput: true,
    });

    let storage = getStorage();
    let date = new Date().getTime();
 
    let nombre = `${usuario.email} _ ${usuario.dni}_${date}`;

    let storageRef = ref(storage, nombre);

    let url = this.afs.ref(nombre);

/*
    uploadString(storageRef,capturedPhoto.dataUrl, 'data_url').then(()=>{
       url.getDownloadURL().subscribe((url1 : any)=>{
        usuario.pathFoto = url1;
        this.fs.agregarUsuario(usuario);
      }) 
    });
    */
   console.log(capturedPhoto.webPath);
   let respuesta = {
     storage : storageRef,
     url : url,
     capturedPhoto : capturedPhoto,
     web : capturedPhoto.webPath
   }
    return respuesta;
  }

}