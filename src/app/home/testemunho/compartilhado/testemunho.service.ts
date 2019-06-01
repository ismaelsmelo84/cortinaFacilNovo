import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Testemunho } from './testemunho.model';

@Injectable()
export class TestemunhoService {
  
  constructor(private firestore: AngularFirestore) { }

  getTestemunhos() {
    return this.firestore.collection('frases').snapshotChanges();
  }

  incluirTestemunho(testemunho: Testemunho){
    return this.firestore.collection('frases').add(testemunho);
  }
  
  alterarTestemunho(testemunho: Testemunho){
    delete testemunho.$key;
    this.firestore.doc('frases/' + testemunho.$key).update(testemunho);
  }

  excluirTestemunho(testemunhoId: string){
    this.firestore.doc('frases/' + testemunhoId).delete();
  }
}
