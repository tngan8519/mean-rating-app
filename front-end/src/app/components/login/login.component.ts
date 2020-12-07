import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loadingLogin: boolean = false;
  errorLogin: string = '';

  loginForm = this.fb.group({
    username: '',
    password: '',
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  handleSubmit(event: Event) {
    event.preventDefault();
    this.loadingLogin = true;
    this.userService
      .signIn(
        this.loginForm.get('username')!.value,
        this.loginForm.get('password')!.value
      )
      .subscribe(
        (data) => {
          // console.log(data);
          this.loadingLogin = false;
          this.router.navigateByUrl('').then();
        },
        (error) => {
          this.loadingLogin = false;
          this.errorLogin = error;
        }
      );
  }
}
