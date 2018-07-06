import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {RouterModule,Routes} from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordResetComponent } from './password-reset/password-reset.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SignupComponent, LoginComponent, PasswordResetComponent],
  providers:[UserServiceService]

})
export class UserModule { }
