import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-stars-rate',
  templateUrl: './stars-rate.component.html',
  styleUrls: ['./stars-rate.component.css'],
})
export class StarsRateComponent implements OnInit, OnChanges {
  @Input() stars!: number;
  innerDiv: string = '';

  constructor() {}

  ngOnInit(): void {
    this.innerDiv = this.inner(this.stars);
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.stars contains the old and the new value...
    // console.log(changes.stars);
    // {previousValue: 5, currentValue: 2, firstChange: false}
    this.innerDiv = this.inner(changes.stars.currentValue);
  }

  inner(a: number) {
    let rows = '';
    for (let i = 0; i < Math.floor(a); i++) {
      rows += "<i class='fas fa-star'></i>";
    }
    if (a % 1 !== 0) {
      rows += "<i class='fas fa-star-half-alt'></i>";
    }
    for (let i = 0; i < 5 - Math.ceil(a); i++) {
      rows += "<i class='far fa-star'></i>";
    }
    return rows;
  }
}
