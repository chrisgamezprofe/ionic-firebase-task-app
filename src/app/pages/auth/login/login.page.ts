import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CollectionServiceService } from 'src/app/services/collection-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 
  message:string =""
  myForm!: FormGroup 

  constructor(public fb:FormBuilder, public loadingControl: LoadingController,public authService:AuthService,public router:Router,public collectionService:CollectionServiceService) { }

  ngOnInit() {
    this.authService.logOut()
    this.myForm = this.fb.group({
      email: ['',[Validators.required, Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z0-9]+\.[a-zA-Z]{2,}$')
      ]],
      password: ['',[Validators.required, Validators.minLength(8),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[0-8])(?=.*[A-Z]).{8,}$/)
      ]],
    });
  }

  get errorControl(){
    return this.myForm?.controls;
  }

  async login(){
    const loading = await this.loadingControl.create();
    await loading.present();

    if(this.myForm?.valid){
      const userResponseInfo = await this.authService.login(
        this.myForm.value.email,this.myForm.value.password
      ).catch((error)=>{
        this.message=error.message;
        loading.dismiss()
      });

      

      if(userResponseInfo && userResponseInfo.user){
        const res = await this.collectionService.getDocumentByField("users","email",userResponseInfo.user.email)
        .catch((error)=>{
          this.message=error.message;
          loading.dismiss()
        });
        if(res && res[0]){
          const userData = res[0];

          await this.authService.saveSession(userData)
          console.log("USERDATA:",userData)
          loading.dismiss()
          this.router.navigate(['./home'])
        }else{
          this.message="No existe el usuario";
          loading.dismiss()
        }
        
      }else{
        this.message="Datos de acceso incorrectos";
        loading.dismiss()
      }
    }else{
      this.message="Datos de acceso incorrectos";
      loading.dismiss()
    }
  }

}
