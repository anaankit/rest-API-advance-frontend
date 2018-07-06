import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../user-service.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(public userService:UserServiceService,public router:Router) {


   }

  ngOnInit() {
  }

  public password;
  public email;

  public resetPassword = () =>{

    if(!this.password){
      alert('password not entered')
    }else if(!this.email){
      alert('email not enteredd')
    }else{
      let resetDetails = {
        password:this.password,
        email:this.email
      }
      console.log(resetDetails);
      this.userService.changePassword(resetDetails).subscribe((response)=>{
        console.log(response)
        if(response.status===200){
          alert('passsword has been reset');
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 2000);
        } else{
          alert(response.message);
        }

      })
    }
    

  } // end of reset password
}
