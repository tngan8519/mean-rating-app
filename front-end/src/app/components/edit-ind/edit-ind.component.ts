import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import { FormBuilder } from '@angular/forms';
import { Individual } from 'src/app/models/individual.model';
import { IndividualService } from 'src/app/services/individual.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-ind',
  templateUrl: './edit-ind.component.html',
  styleUrls: ['./edit-ind.component.css'],
})
export class EditIndComponent implements OnInit {
  userInfo!: User;
  individual!: Individual;
  id!: string | null;
  loading: boolean = false;
  error: string = '';
  fileUpload!: string;

  editIndForm = this.fb.group({
    name: '',
    description: '',
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private individualService: IndividualService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userService.currentUser.subscribe((x: User) => (this.userInfo = x));
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    if (this.id) {
      this.individualService
        .detailIndividual(this.id)
        .subscribe((t: Individual) => {
          this.individual = t;

          this.editIndForm.setValue({
            name: this.individual.name,
            description: this.individual.description,
          });
        });
    }
  }

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
    if (this.id) {
      this.individualService
        .editIndividual(
          this.id,
          this.editIndForm.get('name')!.value,
          this.fileUpload,
          this.editIndForm.get('description')!.value,
          this.userInfo
        )
        .subscribe(
          (res) => {
            // console.log(res);
            if (res.message === 'Individual update') {
              this.router.navigateByUrl(`/individual/${this.id}`).then();
            }
          },
          (err) => {
            // console.log(err);
          }
        );
    }
  }
}
