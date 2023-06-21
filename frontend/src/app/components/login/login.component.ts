import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {GoogleAuthProvider} from '@angular/fire/auth'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { BankdataService } from 'src/app/services/bankdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formlogin!:FormGroup
  ngOnInit(){

  }
  constructor(private fb: FormBuilder,private fire: AngularFireAuth,private route: Router,private user: BankdataService){
    this.formlogin = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }
  login() {
    this.fire.signInWithEmailAndPassword(this.formlogin.value.email,this.formlogin.value.password).then((value)=>{
      this.user.addLogin(this.formlogin.value).subscribe((curr)=>{
        this.user.useremail = curr.data[0].email
        this.user.userbank = curr.data[0]._id
      })
      this.route.navigate(['/bank'])
     
    }).catch((err)=>{
      const confirmed = confirm('Not Found. Do you want to register instead?');
      if(confirmed){
        this.fire.createUserWithEmailAndPassword(this.formlogin.value.email,this.formlogin.value.password).then((value)=>{
          this.user.addLogin(this.formlogin.value).subscribe((curr)=>{
            console.log("Login")
          })
          alert('Registered Successfully')
          this.formlogin.reset()
        }).catch((e)=>{
          console.log(e)
        })
      }
      else{
        this.formlogin.reset()
      }
    })
  }
  googlesign(){
    this.fire.signInWithPopup(new GoogleAuthProvider).then((value)=>{
      var dataemail = {
        "email": value.user?.email
      }
      this.user.addLogin(dataemail).subscribe((curr)=>{
        console.log(curr)
        if(curr.data.email){
          this.user.useremail = curr.data.email
        }
        else{
          this.user.useremail = curr.data[0].email
        }
        
        if(curr.data._id){
          this.user.userbank = curr.data._id
        }
        else{
          this.user.userbank = curr.data[0]._id
        }
        
        console.log("Login")
      })
      this.route.navigate(['/bank'])
    }).catch((e)=>{
      console.log(e)
    })
  }
}
