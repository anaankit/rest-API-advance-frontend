import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';


import {HttpClient,HttpHeaders} from '@angular/common/http';
import {HttpErrorResponse,HttpParams} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http'
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  

  constructor(public _http:HttpClient) {

    console.log('user service constructor called')

   } // end of constructor
   
  private url = 'http://localhost:3000/api/v1/users'

  public signup = (data):any => {

    const params = new HttpParams()
    .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('email',data.email)
    .set('password',data.password)
    .set('mobileNumber',data.mobileNumber)

    return this._http.post(`${this.url}/signup`,params);

  } // end of sign up

  public login =(data):any=>{
    const params = new HttpParams()
    .set('email',data.email)
    .set('password',data.password)

    

    return this._http.post(`${this.url}/login`,params);
  } // end of login function
 

  public changePassword(data):Observable<any> {
      
    let params =  new HttpParams()
    .set('password',data.password)
    return this._http.post(`http://localhost:3000/api/v1/users/resetPassword/${data.email}`,params)
  } // end of change password

  
  public setUserInfoInLocalStorage = (data) =>{

     localStorage.setItem('userInfo',JSON.stringify(data))

  }

  public getUserInfoFromLocalStorage = ()=>{
    return JSON.parse(localStorage.getItem('userInfo'))
  }

}
