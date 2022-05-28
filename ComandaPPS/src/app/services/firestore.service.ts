import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  clientesCollectionReference: any;
  clientes: Observable<any>;

  clientesArray : any = [];
  
  constructor(private angularF : AngularFirestore) 
  {
    this.clientesCollectionReference = this.angularF.collection<any>('clientes');
    this.clientes = this.clientesCollectionReference.valueChanges({idField: 'id'});

    this.traerClientes().subscribe(value => {
      this.clientesArray = value;
    });

  }

  traerClientes()
  {
    return this.clientes;
  }

/*   modificarFoto(foto : any, id : any, coleccion : string)
  {
    return this.angularF.collection(coleccion).doc(id).update(foto);
  } */

  agregarCliente(cliente : any)
  {
      this.clientesCollectionReference.add({...cliente});
  }
}
