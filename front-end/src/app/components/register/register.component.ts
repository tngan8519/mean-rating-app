import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loadingReg: boolean = false;
  errorReg: string = '';

  regForm = this.fb.group({
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

    this.loadingReg = true;

    this.userService
      .register(
        this.regForm.get('username')!.value,
        this.regForm.get('password')!.value,
        ''
      )
      .subscribe(
        (data) => {
          // console.log(data);
          this.loadingReg = false;
          this.router.navigateByUrl('').then();
        },
        (error) => {
          this.loadingReg = false;
          this.errorReg = error;
        }
      );
  }
}
