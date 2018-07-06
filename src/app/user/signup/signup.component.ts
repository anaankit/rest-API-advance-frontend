import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {Router} from '@angular/router'
import { UserServiceService } from '../../user-service.service';
import { SocketService } from '../../socket.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName:any
  public lastName:any
  public email:any
  public password:any
  public mobileNumber:any

  constructor(public socketService:SocketService,public router:Router,public userService:UserServiceService) {

   } // end of constructor



  ngOnInit() {
    
   

  } // end of on init


  public signupFunction:any=()=>{

    if(!this.firstName){
      alert('first Name missing')
    }else if(!this.lastName){
      alert('last Name missing')
    }else if(!this.email){
      alert('email not present')
    }else if(!this.password){
      alert('password not present')
    }else if(!this.mobileNumber){
      alert('mobile Number not present')
    }else{

      let signUpDetails = {

        firstName:this.firstName,
        lastName:this.lastName,
        email:this.email,
        password:this.password,
        mobileNumber:this.mobileNumber
      }


      this.userService.signup(signUpDetails).subscribe((response)=>{

        console.log(response);

        if(response.status === 200){

          let mailDetails = {

            receiver:'',
            subject:'Welcome',
            text:'Welcome to Rest API advance assignment',
            html:'<p>Welcome to Rest API advance assignment</p>'

          }
          mailDetails.receiver = this.email
          this.socketService.sendMail(mailDetails)

          alert('signup successfull');

          setTimeout(()=>{

            this.router.navigate(['/login'])

          },2000)

        } else{
          alert(response.message)
        }
        
      },(err)=>{
        alert('unable to signin');
      })

    } // end condition

  } // end signup function


  


}
