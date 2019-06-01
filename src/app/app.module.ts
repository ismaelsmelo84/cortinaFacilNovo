// Ambiente
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

// Componentes
import { SlideshowComponent } from './home/slideshow/slideshow.component';
import { ProdutosComponent } from './home/produtos/produtos.component';
import { SobreComponent } from './home/sobre/sobre.component';
import { PromocaoComponent } from './home/promocao/promocao.component';
import { TestemunhoComponent } from './home/testemunho/testemunho.component';
import { NewsComponent } from './home/news/news.component';
import { OrderComponent } from './home/pedido/pedido.component';
import { PedidoEmailComponent } from './home/pedido-email/pedido-email.component';
import { DestaqueComponent } from './home/destaques/destaque.component';
import { ContatoComponent } from './home/contato/contato.component';
import { TermosComponent } from './home/termos/termos.component';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule, StorageBucket } from 'angularfire2/storage';

// Serviços
import { ValidationService } from './_components/validator/validation.service';
import { AppControlMessagesComponent } from './_components/validator/app-control-messages.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './_shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    PedidoEmailComponent,
    SlideshowComponent,
    ProdutosComponent,
    SobreComponent,
    PromocaoComponent,
    TestemunhoComponent,
    NewsComponent,
    DestaqueComponent,
    ContatoComponent,
    TermosComponent,
    AppControlMessagesComponent 
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [ ValidationService, 
               AngularFirestoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
