import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Produto } from './produto.model';

@Injectable()
export class ProdutoService {

  constructor(private firestore: AngularFirestore) { }

  getProdutos() {
    return this.firestore.collection('produtos', ref => ref.orderBy('ordem')).snapshotChanges();  
  };

  incluirProduto(produto: Produto){
    return this.firestore.collection('produtos').add(produto);
  }
  
  alterarProduto(produto: Produto){
    delete produto.$key;
    this.firestore.doc('produtos/' + produto.$key).update(produto);
  }

  excluirProduto(produtoId: string){
    this.firestore.doc('produtos/' + produtoId).delete();
  }
}
