import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, scan, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { User } from 'socket-io-models/models';
import { Update, Message, Status } from 'socket-io-models/models';
import { Router } from '@angular/router';
import { ChatDatabaseService } from '../../chat/services/chat-database.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket?: Socket;
  user$ = new BehaviorSubject<User | null>(null);

  updateSubject = new Subject<Update | null>();
  updates$ = this.updateSubject.pipe(
    scan((acc: Update[], value) => {
      if (value) return [...acc, value];
      else return [...acc];
    }, [])
  );

  constructor(
    private scroller: ViewportScroller,
    private router: Router,
    private db: ChatDatabaseService
  ) {}

  connect(username: string) {
    this.socket = io('localhost:3000', {
      auth: {
        username,
      },
    });

    this.socket.on('connection_error', (err) => {
      console.log(err);
    });

    this.socket.on('authenticated', (user) => {
      this.user$.next(user);
      this.router.navigate(['chat']);
      this.fetchMessages();
      this.registerEventHandlers();
    });

    this.socket.on('disconnect', () => {
      this.user$.next(null);
      this.router.navigate(['']);
    });
  }

  registerEventHandlers() {
    this.socket?.on('message', (message: Message) => {
      console.log('added on emit');
      this.updateSubject.next(message);
      this.db.addMessage(message);
      this.db.addUpdate(message);
      setTimeout(() => {
        console.log(document.body.scrollHeight);
        this.scroller.scrollToPosition([0, document.body.scrollHeight]);
      }, 100);
    });

    this.socket?.on('status', (status: Status) => {
      this.updateSubject.next(status);
      this.db.addUpdate(status);
      setTimeout(() => {
        console.log(document.body.scrollHeight);
        this.scroller.scrollToPosition([0, document.body.scrollHeight]);
      }, 100);
    });
  }

  disconnect() {
    this.socket?.close();
  }

  fetchMessages() {
    // this.http
    //   .get<Update[]>('http://localhost:3000/messages')
    //   .subscribe((data) => {
    //     data.forEach((d) => this.updateSubject.next(d));
    //   });

    const sub = this.db.getMessages().subscribe((data) => {
      console.log('added on live query');
      data.forEach((d) => this.updateSubject.next(d));
      sub.unsubscribe();
    });

    setTimeout(() => {
      console.log(document.body.scrollHeight);
      this.scroller.scrollToPosition([0, document.body.scrollHeight]);
    }, 100);
  }

  message(message: string) {
    this.socket?.emit(
      'message',
      message,
      'global-chatroom',
      (message: Message) => {
        console.log('added on callback');
        this.updateSubject.next(message);
        this.db.addMessage(message);
        this.db.addUpdate(message);
      }
    );

    setTimeout(() => {
      console.log(document.body.scrollHeight);
      this.scroller.scrollToPosition([0, document.body.scrollHeight]);
    }, 100);
  }
}
