import { Component, OnInit } from '@angular/core';
import { ChatDatabaseService } from '../../../chat/services/chat-database.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private chatService: ChatDatabaseService) {}

  ngOnInit(): void {}

  clear() {
    this.chatService.clear();
  }
}
