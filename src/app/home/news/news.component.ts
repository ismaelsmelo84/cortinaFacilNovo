import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { News } from './compartilhado/news.model';
import { NewsService } from './compartilhado/news.service';
import { ValidationService } from '../../_components/validator/validation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-news',
  templateUrl: './news.component.html',
  providers :[NewsService]
})

export class NewsComponent implements OnInit {

  newsForm: FormGroup;
  news: News;

  constructor( private fb: FormBuilder,
               private newsService: NewsService, 
               private tostr: ToastrService ) {}

  ngOnInit() {
    this.newsForm = this.fb.group({
      no_email: this.fb.control( '', Validators.compose([Validators.required, ValidationService.emailValidator ])),
    });
  }

  onSubmit() {
    if ( this.newsForm.dirty && this.newsForm.valid ) {
      this.newsService.incluirNews({
        no_email: this.newsForm.controls.no_email.value,
        ts_inclusao: String(new Date())
      });
      this.tostr.success('Inscrição realizada com sucesso', 'News cadastrada');
    }
  }

  public resetForm() {
    this.newsForm = this.fb.group({
      no_email: this.fb.control( '', Validators.compose([Validators.required, ValidationService.emailValidator ])),
    });
 }
}

