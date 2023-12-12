import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {User} from "../../user";
import {AdminService} from "../../services/admin.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{

  personalList!: Observable<User[]>;

  constructor(private adminService: AdminService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.personalList = this.adminService.getPersonalList()
  }
}
