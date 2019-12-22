import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MessageComponent } from './componentes/message/message.component';
import { ChatNameEditModalComponent } from './chat-name-edit-modal/chat-name-edit-modal.component';
import { PopoverHomeComponent } from './componentes/popover-home/popover-home.component';
import { TabChatComponent } from './tab-chat/tab-chat.component';
import { TabScheduleComponent } from './tab-schedule/tab-schedule.component';
import { TabAboutComponent } from './tab-about/tab-about.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: '/home/about',
        pathMatch: 'full'
      },
      {
        path: '',
        component: HomePage,
        children:[
          { path: 'chat', component: TabChatComponent },
          { path: 'schedule', component: TabScheduleComponent },
          { path: 'about', component: TabAboutComponent },
        ],
      },
      
    ])
  ],
  declarations: [
    HomePage,
    MessageComponent,
    ChatNameEditModalComponent,
    PopoverHomeComponent,
    TabChatComponent,
    TabScheduleComponent,
    TabAboutComponent,
  ],
  entryComponents: [
    ChatNameEditModalComponent,
    PopoverHomeComponent,
  ]
})
export class HomePageModule {}
