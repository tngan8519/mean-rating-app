import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-rating',
  templateUrl: './form-rating.component.html',
  styleUrls: ['./form-rating.component.css'],
})
export class FormRatingComponent implements OnInit {
  userInfo!: User;

  @Input() individualId!: string;
  @Input() rateId!: string;
  @Input() preText!: string | undefined | null;
  @Input() preRate!: number | undefined | null;

  @Output() handleRateSubmit = new EventEmitter<{
    individualId: string;
    rating: number;
    text: string;
    userInfo: User;
  }>();
  @Output() handleRateEdit = new EventEmitter<{
    rateId: string;
    rating: number;
    text: string;
    individualId: string;
    userInfo: User;
  }>();

  rateForm = this.fb.group({
    rating: '0',
    text: '',
  });

  iniPlaceholder!: string;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userService.currentUser.subscribe((x: User) => (this.userInfo = x));
  }

  ngOnInit(): void {
    this.iniPlaceholder = this.preText ? '' : 'write your rating ...';
    if (this.preRate === undefined && this.preText === undefined) {
      this.preRate = null;
      this.preText = null;
    }
    this.rateForm.setValue({ rating: this.preRate, text: this.preText });
  }

  submit() {
    this.handleRateSubmit.emit({
      individualId: this.individualId,
      rating: this.rateForm.get('rating')!.value,
      text: this.rateForm.get('text')!.value,
      userInfo: this.userInfo,
    });
  }

  edit() {
    this.handleRateEdit.emit({
      rateId: this.rateId,
      rating: this.rateForm.get('rating')!.value,
      text: this.rateForm.get('text')!.value,
      individualId: this.individualId,
      userInfo: this.userInfo,
    });
  }
}
