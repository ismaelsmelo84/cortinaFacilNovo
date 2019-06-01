import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Promocao } from './promocao.model';

@Injectable()
export class PromocaoService {
  
  constructor(private firestore: AngularFirestore) { }

  getPromocoes() {
    return this.firestore.collection('promocao').snapshotChanges();
  }

  incluirPromocao(promocao: Promocao){
    return this.firestore.collection('promocao').add(promocao);
  }
  
  alterarPromocao(promocao: Promocao){
    delete promocao.$key;
    this.firestore.doc('promocao/' + promocao.$key).update(promocao);
  }

  excluirPromocao(promocaoId: string){
    this.firestore.doc('promocao/' + promocaoId).delete();
  }
}
