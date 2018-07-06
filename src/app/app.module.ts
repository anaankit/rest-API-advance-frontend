import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule,Routes} from '@angular/router';
import {UserModule} from '../app/user/user.module'
import { SignupComponent } from './user/signup/signup.component';
import { LoginComponent } from 'src/app/user/login/login.component';
import { UserServiceService } from './user-service.service';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http'
import { ChatComponent } from './chat/chat/chat.component';
import { ChatModule } from './chat/chat.module';
import { PasswordResetComponent } from './user/password-reset/password-reset.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';






@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UserModule,
    ChatModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'signup',component:SignupComponent,pathMatch:'full' },
      {path:'login',component:LoginComponent,pathMatch:'full'},
      {path:'',redirectTo:'login',pathMatch:'full'},
      // {path:'*',component:LoginComponent},
      // {path:'**',component:LoginComponent},
      {path:'chat',component:SignupComponent,pathMatch:'full'},
      {path:'resetPasswords',component:PasswordResetComponent,pathMatch:'full'}
    ])
    
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
