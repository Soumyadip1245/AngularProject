import { Component } from '@angular/core';
import { BankdataService } from 'src/app/services/bankdata.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent {
  email:any
  accountnumber: any = ""
  bankname: any
  ifsccode: any
  location:any
  type: any
  isLoading: boolean = true;
  isEmpty:boolean= false
  dataarray: any = []
  isEditingCode: boolean = true
  constructor(private user: BankdataService){
   setTimeout(()=>{
    this.email = this.user.useremail
    this.accountnumber = this.user.userbank
    this.isLoading = false;
    this.checkdata()
   },5000)
  }
  ngOnInit(){
    
  }
  addDetails(){
    var data = {
      account: this.accountnumber,
      bankname: this.bankname,
      ifsccode: this.ifsccode,
      branch: this.location,
      accounttype: this.type
    }
    this.user.addBank(data).subscribe((curr)=>{
      if(curr.success){
        this.accountnumber = "",
        this.bankname = "",
        this.ifsccode = "",
        this.location = "",
        this.type = ""
        this.checkdata()
      }
      else{
        console.log("Error")
      }
    })
  }
  checkdata(){
    this.user.checkdata().subscribe((curr)=>{
      console.log(curr)
      if(curr.success){
        this.isEmpty = true
      }
      else{
        this.dataarray.push(curr.data)
        this.isEmpty = false
      }
    })
  }
  enableEdit(i:any){
    i.isEditingCode = !i.isEditingCode;
    i.isEditingBranch = !i.isEditingBranch;
  }
  editData(id:any){
    var data = {
      "branch": id.branch,
      "ifsccode": id.ifsccode
    }
    id.isEditingCode = !id.isEditingCode;
    id.isEditingBranch = !id.isEditingBranch;
    this.user.editBank(data).subscribe((curr)=>{
     console.log(curr.message)
    })
  }
  deleteedit(){
    var data = {
      "account": "",
       "branch" : "",
       "ifsccode" : "",
       "bankname" : "",
       "accounttype" : ""
    }
    const confirmed = confirm('Do you want to delete data');
    if(confirmed){
      this.user.deleteBank(data).subscribe((curr)=>{
        this.isEmpty = true
      })
    }
    else{
      console.log("Delete")
    }
  }
}
