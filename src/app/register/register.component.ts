import { Component, OnInit, ɵSWITCH_TEMPLATE_REF_FACTORY__POST_R3__ } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgSwitchDefault } from '@angular/common';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { Router } from '@angular/router';

declare var require: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Variable Initialization
  registerForm : FormGroup;
  submitted = false;
  inputValue: any;
  inputValue2: any;
  inputValue3: any;
  inputValue4: any;
  inputValue5: any;
  inputValue6: any;
  userInfo: any = {};
  users: any;

  constructor(private ds: DataService, private formbuilder: FormBuilder, public router: Router) { 
  }

  ngOnInit(): void {

    // Registration Form Parameters
    this.registerForm = this.formbuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['',[ Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      contactNum: ['', [Validators.required, Validators.maxLength(11)]],
    });
  }

  // Checks if registration is valid, if username is available and registers the user
  async onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid){
    const Swal = require('sweetalert2')
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        confirmButtonColor: '#30a0e0',
        text: 'You have to provide all the required input.'
      })
      return false;
    }
    this.userInfo.username = this.inputValue;

    // API Request that searches entered username by the user in the database
    await this.ds.sendApiRequest("checkUsernameEmailExist", this.userInfo).subscribe(res => {
    console.log(res);
    console.log(res.payload);
    if (res.payload.length > 0) {
    const Swal = require('sweetalert2')
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        confirmButtonColor: '#30a0e0',
        text: 'Your desired username is already taken.'
      })
    }
    else {
    const Swal = require('sweetalert2')
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        confirmButtonColor: '#30a0e0',
        text: 'Your desired username is available.'
      }) .then ((result) => {
        if (result.value) {
        const Swal = require('sweetalert2')
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            confirmButtonColor: '#30a0e0',
            text: 'You have successfully registered with WeCater.'
          }) .then (async (result) => {
            if(result.value) {
          this.registerUser();
          this.router.navigate(['/landingpage']);
          }
          })
        }
      })
    }
    });
  }

  // Accepts the values of the input fields and sends an API Request to insert user into the database
async registerUser(){

    this.userInfo.username = this.inputValue;
    this.userInfo.password = this.inputValue2;
    this.userInfo.fname = this.inputValue3;
    this.userInfo.lname = this.inputValue4;
    this.userInfo.contactnum = this.inputValue5;
    this.userInfo.email = this.inputValue6;

  await this.ds.sendApiRequest("register", this.userInfo).subscribe( res => {
    console.log(res);
  });


}
}