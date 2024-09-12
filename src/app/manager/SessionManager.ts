import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class SessionManager{
    private readonly temporaryUserName : string = 'user@gmail.com' ||'admin@gmail.com';
    private readonly temporaryPass : string = 'user123' || 'admin123'

     performLogin(user: string, pass:string):boolean{
        if(this.temporaryUserName == user && this.temporaryPass == pass){
            return true
          }else{
            return false
          }
    }

    performLoginAdmin(user: string, pass:string):boolean{
      if(this.temporaryUserName == user && this.temporaryPass == pass){
          return true
        }else{
          return false
        }
  }
}