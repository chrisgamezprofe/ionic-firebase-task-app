import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CollectionServiceService } from 'src/app/services/collection-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  myForm!: FormGroup 

  constructor(public fb:FormBuilder, public loadingControl: LoadingController,public authService:AuthService,public router:Router,public collectionService:CollectionServiceService) { }
 
  ngOnInit() {
    this.myForm = this.fb.group({
      fullName: ['',[Validators.required]],
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

  async register(){
    const loading = await this.loadingControl.create();
    await loading.present();
    if(this.myForm?.valid){
      const userResponseInfo = await this.authService.register(
        this.myForm.value.email,this.myForm.value.password
      ).catch((error)=>{
        console.error(error);
        loading.dismiss()
      });

      

      if(userResponseInfo){

        const userData = {
          name: this.myForm.value.fullName,
          email: userResponseInfo.user.email,
          uid: userResponseInfo.user.uid
        }

        const res = this.collectionService.addDocument("users",userData).catch((error)=>{
          console.error(error);
          loading.dismiss()
        });
        await this.authService.saveSession(userData)

        if(res){
          loading.dismiss()
          this.router.navigate(['/home'])
        }
        
      }
    }
  }

}
