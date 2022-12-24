import { Component, Input, OnInit } from '@angular/core';
import { Status } from 'socket-io-models/models';

@Component({
  selector: 'app-status-item',
  templateUrl: './status-item.component.html',
  styleUrls: ['./status-item.component.scss'],
})
export class StatusItemComponent implements OnInit {
  @Input() status!: Status;

  constructor() {}

  ngOnInit(): void {}
}
