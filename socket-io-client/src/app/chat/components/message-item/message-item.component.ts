import {
  Component,
  HostBinding,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { liveQuery } from 'dexie';
import { Subscription } from 'rxjs';
import { Message } from 'socket-io-models/models';
import { SocketService } from '../../../shared/services/socket.service';
import { ChatColorService } from '../../services/chat-color.service';
import { ChatDatabaseService } from '../../services/chat-database.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
})
export class MessageItemComponent implements OnInit, OnDestroy {
  @Input() message!: Message;

  @HostBinding('class') class = '';
  color: string = '';
  sub?: Subscription;

  constructor(
    private charColor: ChatColorService,
    private socket: SocketService
  ) {}

  ngOnInit(): void {
    this.sub = this.socket.user$.subscribe((user) => {
      if (user?.id === this.message.sender) {
        this.class = 'me';
      } else this.color = this.charColor.getColor(this.message.sender);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
