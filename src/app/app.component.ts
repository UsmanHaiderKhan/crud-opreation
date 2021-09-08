import {Component, OnInit} from '@angular/core';
import {User} from "./shared/model/user";
import {UserService} from "./shared/services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "./shared/utility/modal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  submitted = false;
  userCreateForm: FormGroup;
  userData: User[] = [];
  singleUserData: User;
  update = true;

  constructor(private userService: UserService, private modalService: ModalService,
              private formBuilder: FormBuilder) {
    // this.userCreateForm.valueChanges.subscribe(console.log);
  }

  get a() {
    return this.userCreateForm.controls;
  }

  ngOnInit(): void {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.userCreateForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')]],
      website: ['', [Validators.required, Validators.pattern(reg)]],
      phone: ['', [Validators.required]],
    });
    this.getAllUsers();
  }

  // Get All Users
  getAllUsers() {
    this.userService.getAllUsers().subscribe(resp => {
      this.userData = resp;
    });
  }

// Create New User
  registerUser() {
    this.submitted = true;
    if (this.userCreateForm.invalid) {
      console.log('invalid form fields');
      return;
    }
    const user: User = {
      username: this.userCreateForm.value.username,
      email: this.userCreateForm.value.email,
      phone: this.userCreateForm.value.phone,
      website: this.userCreateForm.value.website,
    };
    this.userService.createUser(user).subscribe(resp => {
      console.log('User Has Been Created Successfully.');
      alert('User Has Been Created Successfully.');
      this.getAllUsers();
    });
  }

// Update user info

  updateUserInfo() {
    this.submitted = true;
    if (this.userCreateForm.invalid) {
      console.log('invalid form fields');
      return;
    }
    const user: User = {
      username: this.userCreateForm.value.username,
      email: this.userCreateForm.value.email,
      phone: this.userCreateForm.value.phone,
      website: this.userCreateForm.value.website,
    };
    this.userService.updateUserRecord(user, this.singleUserData.id).subscribe(resp => {
      console.log('User Has Been Updated Successfully.');
      alert('User Has Been Updated Successfully.');
      this.getAllUsers();
    });
  }

// Delete user
  deleteUser(userId: any) {
    const result = confirm('Are you sure you want to delete this Record.!');
    if (result) {
      this.userService.deleteUserRecord(userId).subscribe(resp => {
        console.log('User has been deleted successfully.');
        this.getAllUsers();
      });
    }
  }

// update User
  getUpdateUser(userId: any) {
    this.update = true;
    this.userService.getUserById(userId).subscribe(resp => {
      this.singleUserData = resp;
      this.userCreateForm.patchValue({
        username: this.singleUserData.username,
        website: this.singleUserData.website,
        email: this.singleUserData.email,
        phone: this.singleUserData.phone,
        id: this.singleUserData.id,
      });
    });
  }

  newCreate() {
    this.update = false;
  }

  //  Dialog Box Options
  openModal(id: string) {
    this.modalService.open(id);
  }

  // Close Dialog model
  closeModal(id: string) {
    this.modalService.close(id);
    this.userCreateForm.reset();
  }

}
