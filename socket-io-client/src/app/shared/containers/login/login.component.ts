import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: this.fb.control(''),
  });

  constructor(
    private fb: FormBuilder,
    private socketService: SocketService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    const username = this.loginForm.value.username;
    if (username) {
      this.socketService.connect(username);
    }
  }
}
