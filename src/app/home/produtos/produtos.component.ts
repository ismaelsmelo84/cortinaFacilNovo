import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-home-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css' ]
})

export class ProdutosComponent {
  
  imgMini1: Observable<string | null>;
  imgMini2: Observable<string | null>;
  imgMini3: Observable<string | null>;

  galeria1: Array<String>;
  galeria2 = [];
  galeria3 = [];
  
  constructor( private storage: AngularFireStorage ) {
    this.imgMini1 = this.obterImagem('mainpage/thumbnail1.jpg');
    this.imgMini2 = this.obterImagem('mainpage/thumbnail2.jpg');
    this.imgMini3 = this.obterImagem('mainpage/thumbnail3.jpg');
    this.galeria1 = [ 'https://firebasestorage.googleapis.com/v0/b/cortinafacil-ba0d7.appspot.com/o/galeria%2Fgaleria1%2Fprodutos_acessorios_01.jpg?alt=media&token=4ec1b22b-507e-4ce2-8449-ec8031a3291b',
                      'https://firebasestorage.googleapis.com/v0/b/cortinafacil-ba0d7.appspot.com/o/galeria%2Fgaleria1%2Fprodutos_acessorios_02.jpg?alt=media&token=3c6b6e2e-4866-431e-818c-8f48b3a038d1', 
                      'https://firebasestorage.googleapis.com/v0/b/cortinafacil-ba0d7.appspot.com/o/galeria%2Fgaleria1%2Fprodutos_acessorios_03.jpg?alt=media&token=c0acd56e-86ff-44c1-b26b-6cba77d06f16' ];
  }

  obterImagem(url: string) {
    const ref = this.storage.ref(url);
    return ref.getDownloadURL();
  }
}
