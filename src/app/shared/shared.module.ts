import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderDemoComponent } from '../pages/demo/header-demo/header-demo.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    InputTextComponent,
    HeaderDemoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
  HeaderComponent,
  LogoComponent,
  InputTextComponent,
  HeaderDemoComponent
  ]
})
export class SharedModule { }
