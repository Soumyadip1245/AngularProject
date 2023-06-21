import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankdataService {
  useremail:any = ""
  userbank: any = ""
  constructor(private http: HttpClient) { }
  addLogin(data:any):Observable<any>{
    return this.http.post('https://angular-project-blue.vercel.app/mean/adduser',data)
  }
  checkdata():Observable<any>{
    console.log(this.userbank)
    return this.http.get('https://angular-project-blue.vercel.app/mean/checkdata/'+this.userbank)
  }
  addBank(data: any):Observable<any>{
    return this.http.post('https://angular-project-blue.vercel.app/mean/addBank/'+this.userbank,data)
  }
  editBank(data:any):Observable<any>{
    return this.http.put('https://angular-project-blue.vercel.app/mean/editData/'+this.userbank,data)
  }
  deleteBank(data:any):Observable<any>{
    return this.http.put('https://angular-project-blue.vercel.app/mean/deleteData/'+this.userbank,data)
  }
}
