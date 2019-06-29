import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalRoutingModule } from './external-routing.module';
import { LoginComponent } from './login/login.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ExternalRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class ExternalModule { }
