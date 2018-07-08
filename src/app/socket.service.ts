import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import {Observable} from 'rxjs';

import { Cookie } from 'ng2-cookies/ng2-cookies';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HttpErrorResponse, HttpParams } from "@angular/common/http";

var shortid = require('shortid');

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  public url = 'http://localhost:3000/'
  public socket;

  constructor(public http:HttpClient) { 

    this.socket = io(this.url);


    
  } //  end of constructoer


  public verifyUser = () =>{

    return Observable.create((observer)=>{

      this.socket.on('verifyUser',(data)=>{
        
        observer.next(data);

      })

    })

  
  } // end of verify user

  public authError = () =>{
    return Observable.create((observer)=>{

      this.socket.on('auth-error',(data)=>{
        observer.next(data);
      })
      
    })

  } // end of authError



  public onlineRooms = () =>{
    
    return Observable.create((observer)=>{

      this.socket.on('onlineRooms',(data)=>{
        observer.next(data);
      })
      
    })

  } // end of online rooms

  public exitRoom = () =>{
  
    
    return Observable.create((observer)=>{

      this.socket.on('exit',(data)=>{
        observer.next(data);
      })
      
    })

  } // end of exit room



  public user_msg = () =>{

  return Observable.create((observer)=>{

    this.socket.on('user_msg',(data)=>{
      console.log('message received')
      observer.next(data);
    })

  })    

  } // end of user msg





  // end of user msg

  public user_typing = () =>{

    
    return Observable.create((observer)=>{

      this.socket.on('user-Typing',(data)=>{
        observer.next(data);
      })
      
    })

  } // end of  user_typing


  public user_notTyping = () =>{

    return Observable.create((observer)=>{

      this.socket.on('userNotTyping',(data)=>{
        observer.next(data);
      })
      
    })


  } // end of user not typing

  public userJoined = () =>{


    return Observable.create((observer)=>{

      this.socket.on('userJoined',(data)=>{
        observer.next(data);
      })
      
    })


  } // end of userJoined

  public userLeft = () =>{

    
    return Observable.create((observer)=>{

      this.socket.on('userLeft',(data)=>{
        observer.next(data);
      })
      
    })

  } // end of userLeft

  
  public sent = () =>{

    
    return Observable.create((observer)=>{

      this.socket.on('sent',(data)=>{
        console.log('received sent')
        observer.next(data);
      })
      
    })

  } // end of sent

  

  public notSent = () =>{

    
    return Observable.create((observer)=>{

      this.socket.on('notSent',(data)=>{
        observer.next(data);
      })
      
    })

  } ///  end of not Sent

    // EVENTS TO BE EMITTED

    public setUser = (authToken) => {

      this.socket.emit("set-user", authToken);
  
    } // end of set user

    public joinRoom = (data) =>{
      this.socket.emit('joinRoom',data)
    } // end off join room

    public killRoom = (data) =>{
      this.socket.emit('killRoom',data);
    } // end of killRoom

    public message = (data) =>{
      this.socket.emit('message',data);

    }// end of message

    public typing = (data) =>{
      this.socket.emit('typing',data);
    } // end of typing
 
    public notTyping = (data) =>{
      this.socket.emit('notTyping',data);
    } // end of notTyping

    public sendMail = (mailDetails) =>{
      console.log('sending mail')
      this.socket.emit('sendMail',mailDetails);
    }

    public askList = () =>{
      this.socket.emit('askList','');
    }

    public  editRoomName = (data) =>{
      this.socket.emit('editRoomName',data)
    }

    public resetId = shortid.generate();
    public load:Boolean = false;



//db code
public getChat = (roomName) =>{
  console.log()
  return this.http.get(`http://localhost:3000/api/v1/getPreviousMessages?roomName=${roomName}`)

  
}









} // end of class

