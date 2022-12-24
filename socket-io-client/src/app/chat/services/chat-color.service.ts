import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatColorService {
  users = new Map<string, string>();
  color = 0;
  constructor() {}

  getColor(username: string) {
    if (this.users.has(username)) return this.users.get(username)!;
    const colorClass = `color${this.nextColor()}`;
    this.users.set(username, colorClass);
    return colorClass;
  }

  nextColor() {
    this.color = ++this.color % 5;
    return this.color + 1;
  }
}
