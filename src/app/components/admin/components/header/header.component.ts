import { Component } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'admin-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class AdminHeaderComponent {

  constructor(private authService: AuthService) {
  }
  logOut() {
    this.authService.logOut();
  }
}
