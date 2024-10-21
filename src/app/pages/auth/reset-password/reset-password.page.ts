import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  
  message:string =""
  myForm!: FormGroup 

  constructor(private fb:FormBuilder,private authService:AuthService, private route:Router) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['',[Validators.required, Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z0-9]+\.[a-zA-Z]{2,}$')
      ]]
    });
  }


  async sendLink(){
     await this.authService.resetPassword(this.myForm.value.email);
     this.route.navigate(['./auth/login']);
  }

}
