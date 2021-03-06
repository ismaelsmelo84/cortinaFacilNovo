/* Recursos nativos e de terceiros */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/* Recursos de campos */
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { RatingComponent } from './rating/rating.component';

/* Recursos de mensagem */
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from './messages/notification.service';

@NgModule({
  declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent ],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  exports: [ InputComponent, RadioComponent, SnackbarComponent, RatingComponent,
             CommonModule, FormsModule, ReactiveFormsModule ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NotificationService]
    };
  }
}
