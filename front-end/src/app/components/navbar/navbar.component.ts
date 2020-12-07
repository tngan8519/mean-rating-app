import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userInfo!: User;
  slidedown: boolean = false;
  classString: string = 'nav__route';

  constructor(private userService: UserService) {
    this.userService.currentUser.subscribe((x: User) => (this.userInfo = x));
  }

  ngOnInit(): void {}

  handleNav() {
    if (this.slidedown) {
      this.slidedown = false;
      this.classString = 'nav__route';
    } else {
      this.slidedown = true;
      this.classString = 'nav__route open';
    }
  }

  handleLogout() {
    this.userService.signOut();
  }
}
