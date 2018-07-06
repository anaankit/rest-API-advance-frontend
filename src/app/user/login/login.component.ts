import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserServiceService } from '../../user-service.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from '../../socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:any
  public password:any

  constructor(public socketService:SocketService ,public router:Router,public userService:UserServiceService) { 

  }

  ngOnInit() {

    this.socketService.load = true;
  }

  public goToChatPage = () =>{

    this.router.navigate(['/chat'])



  } // end of go to chat page

  public loginFunction:any=()=>{
    
    if(!this.email){
      alert('email not present')
    }else if(!this.password){
      alert('password not present')
    }else{

      let loginDetails = {
        email:this.email,
        password:this.password
      } 
      
    
      this.userService.login(loginDetails).subscribe((response)=>{

        if(response.status===200){
          alert('login successfull');
          Cookie.set('authToken',response.data.authToken);  
          this.userService.setUserInfoInLocalStorage(response.data.userDetails);  
          this.goToChatPage();
        } else{
          alert('unable to login')
        }
      },(err)=>{
        alert('error while logging in')
      })
    }
  } // end of login function

  public mailDetails = {
    receiver:'',
    subject:'Password reset Link',
    text:'Here is your password reset Link http://localhost:4200/resetPasswords',
    html:'<p>Here is your password reset Link http://localhost:4200/resetPasswords</p>',
  }
  
  public confirmation:Boolean = false;
  public sendMail = () =>{

    this.socketService.sendMail(this.mailDetails)
    this.confirmation = true;


  } 

  public resetBox = false;
  public forgot = () =>{
    this.resetBox =  true;
  }

}
