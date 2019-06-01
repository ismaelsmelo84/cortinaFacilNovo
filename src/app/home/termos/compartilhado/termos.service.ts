import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Termos } from './termos.model';

@Injectable()
export class TermoService {
  
  constructor(private firestore: AngularFirestore) { }

  getTermos(url: string) {
    return this.firestore.collection(url, ref => ref.orderBy('nu_ordem')).snapshotChanges();
  }

  incluirTermo(url: string, termo: Termos){
    return this.firestore.collection(url).add(termo);
  }
  
  alterarTermo(url: string, termo: Termos){
    delete termo.$key;
    this.firestore.doc(url + '/' + termo.$key).update(termo);
  }

  excluirTermo(url: string, termoId: string){
    this.firestore.doc(url + '/' + termoId).delete();
  }
}
