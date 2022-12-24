import { Injectable } from '@angular/core';
import Dexie, { liveQuery, Table } from 'dexie';
import { Message, Update } from 'socket-io-models';

@Injectable({
  providedIn: 'root',
})
export class ChatDatabaseService {
  db = new ChatDatabase();

  messages$ = liveQuery(() => this.db.messageItems.toArray());

  constructor() {
    const sub = this.getLastMessage().subscribe((x) => {
      console.log(x);
      sub.unsubscribe();
    });
  }

  addMessage(message: Message) {
    this.db.messageItems.add(message);
  }

  addUpdate(update: Update) {
    this.db.updates.add(update);
  }

  populateNewMessages() {
    this.db.messageItems.toArray().then();
  }

  getMessages() {
    return liveQuery(() => this.db.messageItems.toArray());
  }

  getUpdates() {
    return liveQuery(() => this.db.updates.toArray());
  }

  getLastMessage() {
    return liveQuery(() =>
      this.db.messageItems.toCollection().limit(1).reverse().toArray()
    );
  }

  clear() {
    return this.db.messageItems.clear();
  }
}

export class ChatDatabase extends Dexie {
  messageItems!: Table<Message, number>;
  updates!: Table<Update, number>;

  constructor() {
    super('chat-database');
    this.version(4).stores({
      messageItems: '++id',
      updates: '++id',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {}
}
