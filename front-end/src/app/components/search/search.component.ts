import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  Individual,
  IndividualWithStars,
} from 'src/app/models/individual.model';
import { IndividualService } from 'src/app/services/individual.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  loading: boolean = false;
  error: string = '';
  individuals!: Individual[];
  foundByName!: Individual[];

  clearFilter: boolean = false;
  newIndividuals!: IndividualWithStars[];
  foundBySelect!: IndividualWithStars[];
  query: string = '';

  searchNameForm = this.fb.group({
    searchName: '',
  });

  selectForm = this.fb.group({
    selection: '',
  });

  constructor(
    private fb: FormBuilder,
    private individualService: IndividualService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.route.queryParams.subscribe((params) => (this.query = params['s']));

    this.individualService.individualBrowse().subscribe(
      (data) => {
        // console.log(data);
        this.loading = false;
        this.individuals = data;
        if (this.query) {
          this.foundByName = this.individuals?.filter(
            (each) => each.name.indexOf(this.query) !== -1
          );
        }
      },
      (error) => {
        this.loading = false;
        this.error = error;
      }
    );
  }

  handleSearchName(event: Event) {
    event.preventDefault();
    this.query = this.searchNameForm.get('searchName')!.value;
    this.router.navigateByUrl(`/search?s=${this.query}`);

    this.foundByName = this.individuals?.filter(
      (each) => each.name.indexOf(this.query) !== -1
    );
  }
  handleSelect(event: Event) {
    event.preventDefault();

    this.searchNameForm.setValue({ searchName: '' });
    this.router.navigateByUrl('search');
    this.clearFilter = false;

    this.newIndividuals = this.individuals?.map((obj) => ({
      ...obj,
      stars: 0,
    }));

    if (this.newIndividuals) {
      for (let i = 0; i < this.newIndividuals.length; i++) {
        if (this.newIndividuals[i].rates.length >= 2) {
          let total = 0;
          this.newIndividuals[i].rates.forEach(
            (element) => (total += element.rating)
          );
          this.newIndividuals[i].stars =
            total / this.newIndividuals[i].rates.length;
        } else if (this.newIndividuals[i].rates.length === 1) {
          this.newIndividuals[i].stars = this.newIndividuals[i].rates[0].rating;
        } else {
          this.newIndividuals[i].stars = 0;
        }
      }
    }

    switch (this.selectForm.get('selection')!.value) {
      case 'highestRate':
        this.foundBySelect = this.newIndividuals.sort((indA, indB) => {
          return indB.stars - indA.stars;
        });

        break;
      case 'lowestRate':
        this.foundBySelect = this.newIndividuals?.sort((indA, indB) => {
          return indA.stars - indB.stars;
        });
        break;
      case 'newest':
        this.foundBySelect = this.newIndividuals?.sort(
          (indA, indB) =>
            new Date(indA.updatedAt).getTime() -
            new Date(indB.updatedAt).getTime()
        );
        break;
      case 'oldest':
        this.foundBySelect = this.newIndividuals?.sort(
          (indA, indB) =>
            new Date(indB.updatedAt).getTime() -
            new Date(indA.updatedAt).getTime()
        );
        break;
      case 'abc':
        this.foundBySelect = this.newIndividuals?.sort((indA, indB) =>
          indA.name.localeCompare(indB.name)
        );
        break;
      case 'z':
        this.foundBySelect = this.newIndividuals?.sort((indA, indB) =>
          indB.name.localeCompare(indA.name)
        );
        break;
      case '':
        this.foundBySelect = [];
        break;
      default:
        this.foundBySelect = [];
    }
  }

  handleReset() {
    this.router.navigateByUrl('search');
    this.clearFilter = true;
  }
}
