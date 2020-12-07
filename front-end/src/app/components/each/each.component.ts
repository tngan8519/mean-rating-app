import { Component, OnInit, Input } from '@angular/core';
import { Individual } from 'src/app/models/individual.model';
import { IndividualService } from 'src/app/services/individual.service';

@Component({
  selector: 'app-each',
  templateUrl: './each.component.html',
  styleUrls: ['./each.component.css'],
})
export class EachComponent implements OnInit {
  @Input() individual!: Individual;
  top: boolean = true;
  checkTop = this.top ? 'top__rated' : 'singleRating bg-white mt-4';
  starsCount: number = 0;
  date!: string;

  constructor(private individualService: IndividualService) {}

  ngOnInit(): void {
    this.starsCount = this.individualService.calculateRate(this.individual);

    this.date = new Date(this.individual.updatedAt).toUTCString();
  }
}
