import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatroomComponent } from './containers/chatroom/chatroom.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { MessageItemComponent } from './components/message-item/message-item.component';
import { StatusItemComponent } from './components/status-item/status-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChatRoutingModule } from './chat-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ChatroomComponent,
    DashboardComponent,
    MessageItemComponent,
    StatusItemComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
  ],
  exports: [
    ChatroomComponent,
    DashboardComponent,
    MessageItemComponent,
    StatusItemComponent,
  ],
})
export class ChatModule {}
