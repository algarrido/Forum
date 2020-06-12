import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { hilo } from '../modelo/hilo';
import { Comentario } from '../modelo/Comentario';


@Injectable({
  providedIn: 'root'
})
export class TodoservicioService {
  myCollection: AngularFirestoreCollection;
  comentarios: AngularFirestoreCollection;
  constructor(private fireStone: AngularFirestore) {
    this.myCollection = fireStone.collection<any>(environment.firebaseConfig.collection);
    this.comentarios = fireStone.collection("comentarios");
  }
  readTODO(): Observable<firebase.firestore.QuerySnapshot> {
    return this.myCollection.get();
  }


  readTODObyID(id: string): Observable<firebase.firestore.DocumentSnapshot> {
    return this.myCollection.doc(id).get();
  }

  addTODO(myNote: hilo): Promise<firebase.firestore.DocumentReference> {
    return this.myCollection.add(myNote);
  }
  addComentario(comentario: Comentario): Promise<firebase.firestore.DocumentReference> {
    return this.comentarios.add(comentario);
  }

  updateTODO(id: string, data: hilo): Promise<void> {
    return this.myCollection.doc(id).set(data);
  }
  removeTODO(id: string): Promise<void> {
    return this.myCollection.doc(id).delete();
  }

  readComentario(): Observable<firebase.firestore.QuerySnapshot> {
    return this.comentarios.get();
  }

  readComentarios(id: String): Observable<Comentario[]> {
    return new Observable((observer) => {
      let suscripcion: Subscription;
      let tiempo = setTimeout(() => {
        suscripcion.unsubscribe();
        observer.error("Timeout");
      }, 10000);
      suscripcion = this.readComentario().subscribe((lista) => {
        clearTimeout(tiempo);
        let listado = [];
        lista.docs.forEach((comentario) => {
          if(comentario.data().hiloId == id){
            listado.push({ id: comentario.id, ...comentario.data() });
          }
          
        });

        observer.next(listado);
        observer.complete();
      })
    });

  }

  readTODO2(timer: number = 10000): Observable<hilo[]> {
    return new Observable((observer) => {
      //observer.next observer.error observer.complete()
      let suscripcion: Subscription;
      let tiempo = setTimeout(() => {
        suscripcion.unsubscribe();
        observer.error("Timeout");
      }, timer);
      suscripcion = this.readTODO().subscribe((lista) => {
        clearTimeout(tiempo);
        let listado = [];
        lista.docs.forEach((nota) => {
          listado.push({ id: nota.id, ...nota.data() });
        });

        observer.next(listado);
        observer.complete();
      })
    });
  }
}
