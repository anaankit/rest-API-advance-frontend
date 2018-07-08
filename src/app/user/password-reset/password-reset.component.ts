import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../user-service.service';
import {Router,ActivatedRoute} from '@angular/router'
import { SocketService } from '../../socket.service';
const shortid = require('shortid');


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(public _route : ActivatedRoute ,public socketService:SocketService,public userService:UserServiceService,public router:Router) {


   }

   public id;
  ngOnInit() {

  this.id = this._route.snapshot.paramMap.get('id');
    console.log(this.id);
    console.log(this.socketService.resetId);
    
    if(!shortid.isValid(this.id)){

    alert('invalid, please try again ')
    this.router.navigate(['/login'])
  }
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
