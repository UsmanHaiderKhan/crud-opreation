import {Component, OnInit} from '@angular/core';
import {User} from "../shared/model/user";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-user-cruds',
  templateUrl: './user-cruds.component.html',
  styleUrls: ['./user-cruds.component.scss']
})
export class UserCrudsComponent implements OnInit {

  userData: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    // this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(resp => {
        this.userData = resp.data;
    });
  }


}
