import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Individual } from 'src/app/models/individual.model';
import { IndividualService } from 'src/app/services/individual.service';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  id!: string | null;
  person!: Individual;
  starsCount: number = 0;
  loading: boolean = false;
  error: string = '';
  userInfo!: User;
  loadingDelete: boolean = false;
  errorDelete: string = '';
  date!: string;
  isSameUser: boolean = false;
  isAlreadyReview: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private individualService: IndividualService,
    private rateService: RateService,
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
          this.person = t;
          this.date = new Date(t.createdAt).toUTCString();

          this.repeatFunc();

          this.date = new Date(this.person.updatedAt).toUTCString();
        });
    }
  }

  repeatFunc() {
    this.isSameUser =
      this.userInfo && this.person.author._id === this.userInfo._id;

    if (
      this.userInfo !== null &&
      this.person.rates.find((rate) => rate.author._id === this.userInfo._id)
    ) {
      this.isAlreadyReview = true;
    } else {
      this.isAlreadyReview = false;
    }

    this.starsCount = this.individualService.calculateRate(this.person);
  }

  showRate() {
    document
      .getElementsByClassName('rating')[0]!
      .scrollIntoView({ behavior: 'smooth' });
  }

  showEditForm() {
    document.querySelector<HTMLElement>('.box')!.style.display = 'block';
  }

  closeEditForm() {
    document.querySelector<HTMLElement>('.box')!.style.display = 'none';
  }

  handleRate(data: any) {
    // console.log(data);
    this.rateService
      .ratePost(data.individualId, data.rating, data.text, data.userInfo)
      .subscribe(
        (data) => {
          // console.log(data);
          if (data.message === 'New rate created') {
            this.person = data.updatedIndividual;
            this.repeatFunc();
          }
        },
        (error) => {
          //  console.log(error)
        }
      );
  }

  handleRateEdit(data: any) {
    // console.log(data);
    this.rateService
      .rateEdit(
        data.rateId,
        data.rating,
        data.text,
        data.individualId,
        data.userInfo
      )
      .subscribe(
        (data) => {
          // console.log(data);
          if (data.message === 'Rate is updated succesfully') {
            this.person = data.updatedIndividual;
            this.repeatFunc();
          }
        },
        (error) => {
          //  console.log(error)
        }
      );
  }

  handleRateDelete(rateId: string, id: string | null, userInfo: User) {
    if (id) {
      this.rateService.rateDelete(rateId, id, userInfo).subscribe(
        (data) => {
          // console.log(data);
          if (data.message === 'Rate is deleted') {
            this.person = data.updatedIndividual;
            this.repeatFunc();
          }
        },
        (error) => {
          //  console.log(error)
        }
      );
    }
  }

  handleDelete(personId: string, userInfo: User) {
    this.loadingDelete = true;
    this.individualService.deleteIndividual(personId, userInfo).subscribe(
      (data) => {
        // console.log(data);
        this.loadingDelete = false;
        this.router.navigateByUrl('search').then();
      },
      (error) => {
        this.loadingDelete = false;
        this.errorDelete = error;
      }
    );
  }

  changeUTCString(d: string) {
    return new Date(d).toDateString();
  }
}
