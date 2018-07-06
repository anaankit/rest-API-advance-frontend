import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import {RouterModule,Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { UserServiceService } from '../user-service.service';
import { SocketService } from '../socket.service';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path:'chat',component:ChatComponent},
      {path:'chatbox/:name',component:ChatboxComponent}
    ])
  ],
  declarations: [ChatComponent, ChatboxComponent]
})
export class ChatModule { }
