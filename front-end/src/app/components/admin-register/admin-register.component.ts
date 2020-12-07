import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css'],
})
export class AdminRegisterComponent implements OnInit {
  loadingReg: boolean = false;
  errorReg: string = '';

  adRegForm = this.fb.group({
    username: '',
    password: '',
    adminCode: '',
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  handleSubmit(event: Event) {
    event.preventDefault();
    this.userService
      .register(
        this.adRegForm.get('username')!.value,
        this.adRegForm.get('password')!.value,
        this.adRegForm.get('adminCode')!.value
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
