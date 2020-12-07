import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachComponent } from './each.component';

describe('EachComponent', () => {
  let component: EachComponent;
  let fixture: ComponentFixture<EachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
