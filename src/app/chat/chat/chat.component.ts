import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import * as io from 'socket.io-client';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { browser, EventEmitter } from 'protractor';
import { UserServiceService } from '../../user-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ENOTSOCK } from 'constants';
import { timeout } from 'q';
import { SocketService } from '../../socket.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(public router:Router,public socketService:SocketService,public userService:UserServiceService) {



   } // end of constructor
 
   public userDetails;
   public authToken;
   
   public COLORS = ['#e6194b','#3cb44b','#ffe119',
   '#0082c8','#f58231','#911eb4','#46f0f0','#f032e6',
   '#fabebe','#008080','#e6beff','#000000']
    
  ngOnInit() {

    this.userDetails = this.userService.getUserInfoFromLocalStorage()
    this.authToken = Cookie.get('authToken');
    this.verifyUserConfirmation();
    this.onlineRooms();
    this.askList();
    
    if(this.socketService.load){
      this.socketService.load = false;
      location.reload();
    }

  } // end of  ngOninit


  public verifyUserConfirmation = () =>{

    this.socketService.verifyUser().subscribe((data)=>{

      this.socketService.setUser(this.authToken);
      
    })

    this.socketService.authError().subscribe((data)=>{
      alert('auth Error Occured');
      this.router.navigate(['/login']);
    })

  } // end of verifyUserConfirmation


  // chat related

  
public removeDuplicates(arr){
  let unique_array = []
  for(let i = 0;i < arr.length; i++){
      if(unique_array.indexOf(arr[i]) == -1){
          unique_array.push(arr[i])
      }
  }
  return unique_array
}

    public onlineRoomsList = [];

    public onlineRooms = () =>{
      this.socketService.onlineRooms().subscribe((data)=>{
        
        this.onlineRoomsList = data;
        let temp = [] 

       temp =  this.removeDuplicates(this.onlineRoomsList)
        
        for(let each of temp){
          
          document.getElementById('list').innerHTML += `<a class="btn" data-toggle="collapse" href="#collapseExample${each}" role="button" aria-expanded="false" aria-controls="collapseExample${each}"
          style="height:10%;
          width:80%;
          background: black;
          opacity: 0.7;
          color:white;
          text-align: center;"  >${each}</a>
          <div style="height:10%;
          width:80%;
          background: black;
          opacity: 0.7;
          color:white;
          text-align: center;"   class="collapse" id="collapseExample${each}">
          <div class="card card-body">
          <a style="text-align = center" href="http://localhost:4200/chatbox/${each}">(Join this chatRoom)</a>
          </div></div><br><br>`
          
                  }
      })
  

    } //  end of online Rooms

    // events to be sent
    public roomName;
    public roomData;
    public joinRoom = () =>{
      this.roomData = {
        roomName : this.roomName
      }
      
    }


    public askList = () =>{
      this.socketService.askList()
    }
   

} // end of  class
