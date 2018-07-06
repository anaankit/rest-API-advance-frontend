import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import * as io from 'socket.io-client';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { browser, EventEmitter } from 'protractor';
import { UserServiceService } from '../../user-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ENOTSOCK } from 'constants';
import { timeout } from 'q';
import { SocketService } from '../../socket.service'



@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  constructor(public socketService:SocketService,public router:Router, public _route:ActivatedRoute,public userService:UserServiceService) { 


  } // end of constructor
  
  public userDetails;
  public authToken;
  public roomName;
  public COLORS = ['#e6194b','#3cb44b','#ffe119',
  '#0082c8','#f58231','#911eb4','#46f0f0','#f032e6',
  '#fabebe','#008080','#e6beff','#000000']
 

  ngOnInit() {
  
    this.userDetails = this.userService.getUserInfoFromLocalStorage()
    this.authToken = Cookie.get('authToken');
    this.verifyUserConfirmation();
    this.roomName = this._route.snapshot.paramMap.get('name');
    this.joinRoom();
    this.newMsg();
    this.receivedTyper();
    this.receivedNotTyping()
    this.userJoined();
    this.userLeft();
    this.onlineRooms();
    this.getPreviousChats();
    this.socketService.load = true;
  }



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

    public onlineRoomsList = [];

    public onlineRooms = () =>{

      this.socketService.onlineRooms().subscribe((data)=>{

        this.onlineRoomsList = [];

        this.onlineRoomsList = data;


      })

     this.socketService.exitRoom().subscribe((data)=>{
       alert('Room and all its messages have been deleted');
       
      setTimeout(() =>{
        console.log('setting timeout')
          
        this.router.navigate(['/chat'])
  
      },3000)
       
     })  

    } //  end of online Rooms

    public newMsg = () =>{

      this.socketService.user_msg().subscribe((data)=>{

        console.log('message has been received'+data.message);
        document.getElementById('message-container').innerHTML+=
        `<div> <span style="color:${this.getUserNameColor(data.sender.length)}; font-weight:bold;">${data.sender}</span>: ${data.message}</div>`        
        this.messageToSend = "";
        window.scrollTo(0, document.body.scrollHeight);
      })


    } //  end of new msg


    public Typer;
    public typingB:Boolean =  false;
    public receivedTyper = () =>{
      this.socketService.user_typing().subscribe((data)=>{
        this.typingB =   true;
        this.Typer =  data.typerName
      })

    }  // end of received typer
    
    public receivedNotTyping = () =>{
      
      this.socketService.user_notTyping().subscribe((data)=>{
        console.log(' received user not typing')
        this.typingB = false;
        this.Typer = "";
      })
    } // end of received not typing

    // events to be sent
    
    public roomData;
    public joinRoom = () =>{
      this.roomData = {
        roomName : this.roomName,
        joiner : this.userDetails.firstName+' '+this.userDetails.lastName
      }
      this.socketService.joinRoom(this.roomData);
      
    }

    public killRoom = () =>{
      this.roomData = {
        roomName:this.roomName
      }
      this.socketService.killRoom(this.roomData);
    } // end of killRoom
    
    public messageObj;
    public messageToSend:any;
    public message = (event: any) =>{
      
      if(event.keyCode === 13){
        console.log('sending message')
        this.messageObj = {
          message:this.messageToSend,
          sender:this.userDetails.firstName+' '+this.userDetails.lastName,
          roomName:this.roomName
          
        }

      this.socketService.message(this.messageObj);
      this.typingB =  false;

     } else{
       this.typing()
     }

    } // end of message

    public typingData;
    public typing = ()=>{
      this.typingData = {
        roomName:this.roomName,
        typerName : this.userDetails.firstName+' '+this.userDetails.lastName
      }
      this.socketService.typing(this.typingData);

      let notTypingData = {
        roomName:this.roomName
      }
      setTimeout(() =>{
      console.log('setting timeout')
        
      this.notTyping(notTypingData)

    },2000)
    } //  end of typing

    public notTyping = (notTypingData) =>{
      this.socketService.notTyping(notTypingData);
    } // end of not typing



    public getUserNameColor = (max) =>{
  
      switch(max){
        case 1:
        return this.COLORS[1];
        case 2:
        return this.COLORS[2];
        case 3:
        return this.COLORS[3];
        case 4:
        return this.COLORS[4];
        case 5:
        return this.COLORS[5];
        case 6:
        return this.COLORS[6];
        case 7:
        return this.COLORS[7];
        case 8:
        return this.COLORS[8];
        case 9:
        return this.COLORS[9];
        default:
        return this.COLORS[0]
      }
    }

    public check = () =>{

      if(this.messageToSend.length<1){

        this.typingB = false;

      }

    } //  end of check

    public userJoined = () =>{

      this.socketService.userJoined().subscribe((data)=>{

        document.getElementById('message-container').innerHTML+= `<div style="text-align:Center; color:grey"><u>${data} Joined</u></div>`

      })

    } //  end of  userJoined

    public userLeft = () =>{

      this.socketService.userLeft().subscribe((data)=>{
        document.getElementById('message-container').innerHTML+= `<div style="text-align:Center; color:grey"><u>${data} Left</u></div>`


      })
    } // end of user left


      public mailReceiver:any;
     public subject = 'Group chat invite'
      public text = 'Your friend has invited you to Join this group: please click to join '+document.URL
      public html = `<p>Your friend has invited you to Join this group: please click to join '${document.URL}</p>`
      public sentConf:boolean = false;
    
    public sendMail = () =>{
       
      let mailDetails = {
        receiver:this.mailReceiver,
        subject:this.subject,
        text:this.text,
        html:this.html,
      }
     
      
      this.socketService.sendMail(mailDetails);

      this.sentConf = true; 

      setTimeout(() =>{
        this.sentConf = false;  

      },5000)
      
    } //  end of send mail


    public previousChats = [];
    public getPreviousChats = () =>{
      console.log(this.roomName)
      this.socketService.getChat(this.roomName).subscribe(
        data=>{
          this.previousChats.push(data);
          console.log(this.previousChats);
          this.loadAllPreviousChat()
        },(err)=>{
          console.log('error occured')
        }
      )
    } // end of previous chat

    public loadAllPreviousChat = () =>{
      let tempChat = this.previousChats.reverse();
          tempChat[0].data.reverse();
      for(let each of tempChat[0].data){
    
        document.getElementById('message-container').innerHTML+=
        `<div> <span style="color:${this.getUserNameColor(each.sender.length)}; font-weight:bold;">${each.sender}</span>: ${each.message}</div>`        
        window.scrollTo(0, document.body.scrollHeight);
                
      }

    } // end of load all previous chat

    public active:Boolean = true;
    public state = () =>{
      this.active = false;
      document.getElementById('container').innerHTML=`<div style="text-align:center; padding:5%; background:black; height:100vh; color:white; opacity:0.7;"><div><b> This Room is now marked as inactive for you<b></div><br>
      <div style="margin-top:10%;"><a style="padding:3%" class="badge badge-primary" href="http://localhost:4200/chatbox/${this.roomName}">Mark as active</a></div>`
      document.getElementById('end').innerHTML=`</div>`
    }

    public showEditBox =  false;
    public setEditBox = () =>{
      this.showEditBox = true;
    } // end of set editBox

    public editedRoomName;
    public newRoomName = (event:any) =>{

      let dataToBeSent={
        newRoomName: this.editedRoomName,
        oldRoomName:''
      }
      dataToBeSent.oldRoomName = this.roomName

      if(event.keyCode == 13){

        this.socketService.editRoomName(dataToBeSent);

        
      setTimeout(() =>{
        
        this.router.navigate([`/chatbox/${dataToBeSent.newRoomName}`])
        location.reload();
  
      },2000)

      }

    } // end of new roomName


}// end of class
  
