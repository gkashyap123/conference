import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public currentUserName:string;

  constructor() { }

  ngOnInit() {
       this.currentUserName = JSON.parse(localStorage.getItem('currentUser')).user.first_name+' '+JSON.parse(localStorage.getItem('currentUser')).user.last_name;
  }

}
