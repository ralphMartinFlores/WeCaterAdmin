import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { Router } from '@angular/router';

declare var require: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
    
  // Variable Initialization
  loginForm: FormGroup;
  isSubmitted = false;
  inputLogid: any;
  inputLogpass: any;
  account: any = {};

  constructor(private ds: DataService, public formBuilder: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    // Form Control Parameters
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

   // Login Form Validation errors
  get errorControl() {
    return this.loginForm.controls;
  }

// Signs in the user
async newLogin() {

  // Checks if Login form is valid or not
  this.isSubmitted = true;
  if (!this.loginForm.valid) {
  const Swal = require('sweetalert2')
  Swal.fire({
    icon: 'error',
    title: 'Oops!',
    confirmButtonColor: '#30a0e0',
    text: 'You have to enter your WeCater credentials.'
  }) 
  return false;
}

  else {

    this.account.uname = this.inputLogid;
    this.account.pword = this.inputLogpass;
    console.log(this.account);

    // API request to sign in the user based on entered username and password
    await this.ds.sendApiRequest("login", this.account).subscribe(res => {
    console.log(res);
    console.log(res.payload.role);

      // Checks if user is an administrator or not
      if (res.payload.role != 2) {
        const Swal = require('sweetalert2')
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          confirmButtonColor: '#30a0e0',
          text: 'Only administrators are allowed beyond this point.'
        })
      }

      // Prompts the administrator if he/she entered wrong username or password
      if (res.payload.length == 0) {
      const Swal = require('sweetalert2')
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          confirmButtonColor: '#30a0e0',
          text: 'Incorrect username or password.'
        })
      }

      // Signs in as the administrator and redirects them to the admin dashboard page, also set some values onto the Local Storage
      else {
        localStorage.setItem("Lastname", res.payload.lname);
        localStorage.setItem("Firstname", res.payload.fname);
        localStorage.setItem("Name", res.payload.fname + " " + res.payload.lname);
        localStorage.setItem("UID", res.payload.uid);
        if (res.payload.role == 2) {
        const Swal = require('sweetalert2')
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            confirmButtonColor: '#30a0e0',
            text: 'Welcome Admin!'
          }) .then ((result) => {
            window.location.href="http://localhost:4200/admin";
          })
        }
        }
      });
    }
  }
}