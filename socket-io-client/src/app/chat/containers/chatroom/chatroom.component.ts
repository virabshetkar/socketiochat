import { ViewportScroller } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Message, Status, Update } from 'socket-io-models/models';
import { SocketService } from '../../../shared/services/socket.service';
import { ChatDatabaseService } from '../../services/chat-database.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  showBackToTop = false;

  messageForm = this.fb.group({
    message: this.fb.control('', [Validators.required]),
  });

  @HostListener('window:scroll', ['$event']) scrollEvent(e: Event) {
    this.showBackToTop =
      window.scrollY + window.innerHeight <= document.body.scrollHeight - 100;
  }

  @HostListener('body:keydown.shift.enter', ['$event']) launchPost(
    $event: KeyboardEvent
  ): void {
    $event.preventDefault();
    return this.sendMessage();
  }

  updates$ = this.chatService.getUpdates();

  constructor(
    private socketService: SocketService,
    private fb: FormBuilder,
    private chatService: ChatDatabaseService,
    private scroller: ViewportScroller
  ) {}

  ngOnInit(): void {}

  sendMessage() {
    let message = this.messageForm.value.message;
    message = message ? message.trim() : '';
    if (message && message !== '') {
      this.socketService.message(message);
      this.messageForm.get('message')?.setValue('');
    }
  }

  message(update: Update) {
    return update as Message;
  }
  status(update: Update) {
    return update as Status;
  }

  scrollToBottom() {
    const y = document.body.scrollHeight;
    this.scroller.scrollToPosition([0, y]);
    this.showBackToTop = false;
  }
}
