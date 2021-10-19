import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerUserForm: FormGroup;

  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.registerUserForm = this.fb.group({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      hireDate: '',
      title: '',
      gender: ''
    });
  }

  register() {
    this.accountService.register(this.registerUserForm.value).subscribe(response => {
      this.toastr.success('The Registration of ' + this.registerUserForm.value.firstName + ' ' + this.registerUserForm.value.lastName + ' has been completed')
      this.registerUserForm.reset();
    }, error => {
      this.toastr.error('Registration error')
    })
  }

  clearForm() {
    this.registerUserForm.reset();
  }

}
