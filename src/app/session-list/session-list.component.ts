import { Component, OnInit } from '@angular/core';
import {SessionService } from '../_services/session.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {


  public sessionlist: any;
    public currentEventType:any;
    public isVisible = false;

  constructor(private _sessionService: SessionService,
              private router: Router) { }

  ngOnInit() {
      if(localStorage.getItem('currentEvent')) {
          this.currentEventType = localStorage.getItem('currentEventType');
          if (this.currentEventType === 'draft') {
              this.isVisible = true;
          }
      }
      this.getSessionListData();
  }

  getSessionListData(){
      this._sessionService.getSessionList().subscribe(
          data => {
              this.sessionlist = data.session_list;
              console.log('sessionlist');
              console.log(this.sessionlist);
          }
      );
  }
}
