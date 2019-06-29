import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MessageComponent } from './componentes/message/message.component';
import { ChatNameEditModalComponent } from './chat-name-edit-modal/chat-name-edit-modal.component';
import { PopoverHomeComponent } from './componentes/popover-home/popover-home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    MessageComponent,
    ChatNameEditModalComponent,
    PopoverHomeComponent,
  ],
  entryComponents: [
    ChatNameEditModalComponent,
    PopoverHomeComponent,
  ]
})
export class HomePageModule {}
