import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Contato } from './compartilhado/contato.model';
import { ContatoService } from './compartilhado/contato.service';
import { ValidationService } from '../../_components/validator/validation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
  providers: [ContatoService]
})

export class ContatoComponent implements OnInit {

  contactForm: FormGroup;

  contact: Contato;

  constructor(private fb: FormBuilder, private contatoService: ContatoService, private tostr: ToastrService) {}

  ngOnInit() {

    this.contactForm = this.fb.group({
      no_contato: this.fb.control( '', [ Validators.required, Validators.minLength(3) ]),
      no_contatoEmail: this.fb.control( '', Validators.compose([Validators.required, ValidationService.emailValidator ])),
      no_contatoAssunto: this.fb.control( '', [ Validators.required, Validators.minLength(5) ]),
      tx_contatoMsg: this.fb.control( '' )
    });
  }

  public onFormSubmit() {

    if ( this.contactForm.dirty && this.contactForm.valid ) {

      this.contact = {
        no_contato: this.contactForm.controls.no_contato.value,
        no_contatoEmail: this.contactForm.controls.no_contatoEmail.value,
        no_contatoAssunto: this.contactForm.controls.no_contatoAssunto.value,
        tx_contatoMsg: this.contactForm.controls.tx_contatoMsg.value,
        ts_inclusao: String(new Date())
      };

      if (this.contactForm.value.$key == null) {
        this.contatoService.incluirContato(this.contact);
        this.tostr.success('Contato registrado com sucesso', 'Envio de e-mail');
      }

      this.resetaForm();
    }
  }

  public resetaForm() {
    this.contactForm = this.fb.group({
      no_contato: this.fb.control( '', [ Validators.required, Validators.minLength(3) ]),
      no_contatoEmail: this.fb.control( '', Validators.compose([Validators.required, ValidationService.emailValidator ])),
      no_contatoAssunto: this.fb.control( '', [ Validators.required, Validators.minLength(5) ]),
      tx_contatoMsg: this.fb.control( '' )
    });
  }
}
