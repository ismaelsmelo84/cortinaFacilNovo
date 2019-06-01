import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { News} from './news.model';

@Injectable()
export class NewsService {
  constructor( private firestore: AngularFirestore ) { }

  getNews() {
    return this.firestore.collection('news').snapshotChanges();
  }

  incluirNews(news: News){
    return this.firestore.collection('news').add(news);
  }
  
  alterarNews(news: News){
    delete news.$key;
    this.firestore.doc('news/' + news.$key).update(news);
  }

  excluirNews(newsId: string){
    this.firestore.doc('news/' + newsId).delete();
  }
}
