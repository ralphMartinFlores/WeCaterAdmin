import { Component, OnInit } from '@angular/core';
import { DataService } from "src/app/data.service";
import Swal from 'sweetalert2/src/sweetalert2.js';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var require: any;


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    
    userInfo: any = {};
    users: any;
    companyInfo: any = {};
    companies: any;
    reviews: any;
    company_id: any;
    company_name: any;
    company_location: any;
    company_contact: any;
    addCompanyForm: FormGroup;
    isSubmitted = false;

  constructor(private ds: DataService, public router: Router, public formBuilder: FormBuilder) { }


  ngOnInit() {
    
    if(localStorage.getItem("Name") == null) {
      this.router.navigate(['/landingpage'])
      const Swal = require('sweetalert2')
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        confirmButtonColor: '#30a0e0',
        text: 'You cannot access this page. Goodbye.'
      })
    }

    else {
      this.getUser();
      this.getCompanies();
      this.getReviews();

      document.getElementById('name').innerHTML = localStorage.getItem("Name");
    }

    this.addCompanyForm = this.formBuilder.group({
      company_name: ['', [Validators.required]],
      company_location: ['', [Validators.required]],
      company_contact: ['', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]+$')]]
    })
  }

  get errorControl() {
  return this.addCompanyForm.controls;
}

getUser(){
  this.ds.sendApiRequest("getUsers", null).subscribe(data => {
    this.users = data.data;
    console.log(this.users)
    console.log(data.data.length)
  })
}

getCompanies(){
  this.ds.sendApiRequest("getCompanies", null).subscribe(data => {
    this.companies = data.data;
    console.log(this.companies)
    console.log(this.companies.length)
  })
}

getReviews(){
  this.ds.sendApiRequest("getReviews", null).subscribe(data => {
    this.reviews = data.data;
    console.log(this.reviews)
    console.log(this.reviews.length)
  })
}

async deleteUser(e) {
  const Swal = require('sweetalert2') 
  Swal.fire({
    icon: 'warning',
    title: 'Warning!',
    showCancelButton: true,
    confirmButtonColor: '#30a0e0',
    cancelButtonColor: '#d33',
    confirmButtonText: 'YES',
    text: 'You are about to remove a user of WeCater. Are you sure you want to proceed?'
  }) .then (async (result) => {
    if (result.value) {
    this.userInfo.user_id = e;
    console.log(e)
    await this.ds.sendApiRequest("deleteUser", this.userInfo).subscribe(res => {
    const Swal = require('sweetalert2')
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                confirmButtonColor: '#30a0e0',
                text: 'WeCater member has been removed.'
              }) .then ((result) => {
        this.getUser()
      })
  });
    }
  })

}

async addCompany() {
  
  this.isSubmitted = true;
    if (!this.addCompanyForm.valid) {
    const Swal = require('sweetalert2')
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        confirmButtonColor: '#30a0e0',
        text: 'You have to provide all the required input.'
      })
      return false;
    }

    else {
      const Swal = require('sweetalert2')
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        confirmButtonColor: '#30a0e0',
        text: 'Catering company has been added.'
      }) .then (async (result) => {
      this.companyInfo.company_name = this.company_name;
      this.companyInfo.company_location = this.company_location;
      this.companyInfo.company_contact = this.company_contact;
      await this.ds.sendApiRequest("addCompany", this.companyInfo).subscribe(res => {
      console.log(res);
      this.getCompanies();
      })
      
  });
    }
}

async updateCompany(e) {
  e.preventDefault();
  await this.ds.sendApiRequest("updateCompany", this.companyInfo).subscribe(res => {
  console.log(res)
    if (res.status.remarks) {
      const Swal = require('sweetalert2')
      Swal.fire({
        icon: 'success',
        title: 'Success',
        confirmButtonColor: '#30a0e0',
        text: 'Changes have been saved.'
      }) .then ((result) => {
        this.getCompanies();
      })
    }
  })
}

updateForm = (company) => {
  this.companyInfo.company_id1 = company.company_id;
  this.companyInfo.company_name1 = company.company_name;
  this.companyInfo.company_location1 = company.company_location;
  this.companyInfo.company_contact1 = company.company_contact;
}

async deleteCompany(e) {
  const Swal = require('sweetalert2') 
  Swal.fire({
    icon: 'warning',
    title: 'Warning!',
    showCancelButton: true,
    confirmButtonColor: '#30a0e0',
    cancelButtonColor: '#d33',
    confirmButtonText: 'YES',
    text: 'You are about to remove a catering service. Are you sure you want to proceed?'
  }) .then (async (result) => {
      if (result.value) {
        const Swal = require('sweetalert2')
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                confirmButtonColor: '#30a0e0',
                text: 'The catering service has been removed.'
              }) .then (async (result) => {
                    this.companyInfo.company_id = e;
                    await this.ds.sendApiRequest("deleteCompany", this.companyInfo).subscribe(res => {
                    this.getCompanies();
              })
  });
      }
    })
}

logoutFunction() {
    const Swal = require('sweetalert2')
              Swal.fire({
                icon: 'question',
                title: 'Sign out?',
                confirmButtonColor: '#30a0e0',
                text: 'Are you sure you want to sign out now?',
                confirmButtonText: 'Yes',
                cancelButtonColor: '#d33',
                showCancelButton: true
              }) .then (async (result) => {
                    if(result.value) {
                      Swal.fire({
                      icon: 'success',
                      title: 'Success',
                      confirmButtonColor: '#30a0e0',
                      text: 'You have signed out.',
                      }) .then ((result) => {
                      localStorage.clear();
                      window.location.href="http://localhost:4200/landingpage";
                      })
                    }
                })
                }
              }