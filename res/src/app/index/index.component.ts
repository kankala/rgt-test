import { Component, OnInit} from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router } from '@angular/router';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})




export class IndexComponent implements OnInit {
  

  
  constructor(private router: Router, private titleService: Title) {
   
    

  }

  routerLink(val : any) {
    this.router.navigate([val]);
    
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
}
