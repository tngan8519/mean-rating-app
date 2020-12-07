import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import { IndividualService } from '../../services/individual.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-ind',
  templateUrl: './create-ind.component.html',
  styleUrls: ['./create-ind.component.css'],
})
export class CreateIndComponent implements OnInit {
  userInfo!: User;
  loading: boolean = false;
  error: string = '';
  fileUpload!: string;

  createForm = this.fb.group({
    name: '',
    description: '',
  });

  constructor(
    private fb: FormBuilder,
    private individualService: IndividualService,
    private userService: UserService,
    private router: Router
  ) {
    this.userService.currentUser.subscribe((x: User) => (this.userInfo = x));
  }

  ngOnInit(): void {}

  handleFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.individualService.individualUploadImage(file).subscribe(
      (res) => {
        // console.log(res);
        if (res.success === true) {
          this.fileUpload = res.image;
        }
      },
      (err) => {
        // console.log(err);
      }
    );
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    this.loading = true;
    this.individualService
      .individualPost(
        this.createForm.get('name')!.value,
        this.fileUpload,
        this.createForm.get('description')!.value,
        this.userInfo
      )
      .subscribe(
        (data) => {
          // console.log(data);
          this.loading = false;
          this.router.navigateByUrl('search').then();
        },
        (error) => {
          this.loading = false;
          this.error = error;
        }
      );
  }
}
