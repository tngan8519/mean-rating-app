import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  homeForm = this.fb.group({
    input: '',
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  handleSearch(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl(`/search?s=${this.homeForm.get('input')!.value}`);
  }
}
