import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
  export class ReadComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  readData:any;
  successmessage:any;

  ngOnInit(): void {

    // get all data

    this.service.getAllData().subscribe((res)=>{
      console.log(res,"res==>");
      this.readData = res.data;
    });
  }

  // get deleteid

    deleteId(id:any){
      console.log(id,'deleteid==>');
    this.service.deleteData(id).subscribe((res)=>{
      console.log(res,'deleteres==>');
      this.successmessage = res.message;

      this.service.getAllData().subscribe((res)=>{
        console.log(res,"res==>");
        this.readData = res.data;

      });
    });
      
    }
  
  }
   
