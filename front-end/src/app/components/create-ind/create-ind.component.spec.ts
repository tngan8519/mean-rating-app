import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIndComponent } from './create-ind.component';

describe('CreateIndComponent', () => {
  let component: CreateIndComponent;
  let fixture: ComponentFixture<CreateIndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
