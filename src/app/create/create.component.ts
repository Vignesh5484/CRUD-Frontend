import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {ApiserviceService} from '../apiservice.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiserviceService,private router:ActivatedRoute) { }

  errormsg: any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    // console.log(this.router.snapshot.paramMap.get('id'),'getid');
    this.getparamid = this.router.snapshot.paramMap.get('id');

    if(this.getparamid)
    {

      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res,'res==>');
        this.userForm.patchValue({
          username:res.data[0].Username,
          password:res.data[0].password,  
          DOB:res.data[0].DOB,  
  
        });
      });  

    }
    
  }

  userForm = new FormGroup({
    'username': new FormControl(' ', Validators.required),
    'password': new FormControl(' ', Validators.required),
    'DOB'     : new FormControl(' ', Validators.required)

  });



  userSubmit() {
    if (this.userForm.valid)
    {
      console.log(this.userForm.value);
      this.service.createData(this.userForm.value).subscribe((res)=>{
        console.log(res,'res==>');
        this.userForm.reset();
        this.successmsg = res.message;
      });                               
    
      
    }
    else {
      this.errormsg = 'All field is required !';
    }
  }

  
      // userupdate
      userUpdate()
      {
          console.log(this.userForm.value,'updatedform');

          if(this.userForm.valid)
          {
            this.service.updateData(this.userForm.value,this.getparamid).subscribe((res)=>{
              console.log(res,'resupdate');
              this.successmsg = res.message
              
            });
          }else{
            this.errormsg = 'all field is requird'
          }
          
      } 

}
