import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIndComponent } from './edit-ind.component';

describe('EditIndComponent', () => {
  let component: EditIndComponent;
  let fixture: ComponentFixture<EditIndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
