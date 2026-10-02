import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExampleHeader } from './Helper/ExampleHeader';
import { Users } from './Services/users';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DemoTask02Oct');
  readonly exampleHeader = ExampleHeader;
  private _snackBar = inject(MatSnackBar);
  durationInSeconds = signal(5);
  users: any[] =[];



  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]), // Initial value and synchronous validator
    middleName: new FormControl('', [Validators.required]), // Initial value and synchronous validator
    lastName: new FormControl('', [Validators.required]), // Initial value and synchronous validator
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required]),
    employeeCode: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
  });

  constructor(private _userService: Users) { }

  ngOnInit() {
    this._userService.GetData().subscribe(
      (data) => { 
        console.log('Data fetched from backend:', data);
        this.users = data;
      }
    );
  }

  handleSubmit() {

    console.log('Form Submitted:', this.profileForm.value);
    if (this.profileForm.valid) {
      // Handle valid form submission
      this._userService.PostData(this.profileForm.value).subscribe(
        (data) => {
          if(data['rowsAffected']>0)
            this.openSnackBar();
          this._userService.GetData().subscribe(
            (data) => { 
              console.log('Data fetched from backend:', data);  
            this.users = data;
            }
          );
          console.log('Data fetched from backend:', data);
        }
      );
      console.log('Form is valid. Proceed with submission logic.');
    } else {
      // Handle invalid form submission
      console.log('Form is invalid. Please correct the errors.');
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(App, {
      duration: this.durationInSeconds() * 1000,
    });
  }
  editUser(user: any) {
    this.profileForm.patchValue(user);
  }

  deleteUser(userId: number) {
    this._userService.DeleteData({ userId: userId }).subscribe(
      (data) => {
        console.log('User deleted:', data);
        this._userService.GetData().subscribe(
          (data) => { 
            console.log('Data fetched from backend:', data);  
          this.users = data;
          }
        );
       })
    }
}
