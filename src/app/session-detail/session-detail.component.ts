import { Component, OnInit } from '@angular/core';
import {SessionService } from '../_services/session.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.css']
})
export class SessionDetailComponent implements OnInit {

    public sessionDetail: any;
    public sessionId: any;
    public sessionForm: any;
    sessionSpeakers: string;
    sessionStartDate: string;
    sessionEndDate: string;
    sessionStartTime: string;
    sessionEndTime: string;

    sessionTicketType: string;
    public currentEventType:any;
    public isVisible = false;

    constructor(private _sessionService: SessionService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private toastr: ToastrService) {

        this.sessionDetail = {
            speakers: ''
        };
        this.sessionId = activatedRoute.snapshot.params.id;
        this.sessionSpeakers = '';

        this.sessionStartDate = '';
        this.sessionEndDate = '';
        this.sessionStartTime = '';
        this.sessionEndTime = '';
    }

    ngOnInit() {
        if(localStorage.getItem('currentEvent')) {
            this.currentEventType = localStorage.getItem('currentEventType');
            if (this.currentEventType === 'draft') {
                this.isVisible = true;
            }
        }
        this.editSessionData(this.sessionId);
    }

    editSessionData(sessionId){
        this._sessionService.getSession(sessionId).subscribe(
            data => {
                this.sessionDetail = data.session;
                console.log('ticket tyupe',this.sessionDetail.ticket_type);
                if(this.sessionDetail.ticket_type == 2){
                    this.sessionTicketType = 'paid';
                }else{
                    this.sessionTicketType = 'free';
                }
                moment().format('MMMM Do YYYY, h:mm:ss a');
                this.sessionStartDate = moment(data.session.start_date_time).format('DD-MM-YYYY');
                this.sessionEndDate = moment(data.session.end_date_time).format('DD-MM-YYYY');
                this.sessionStartTime = moment(data.session.start_date_time).format('hh:mm a');
                this.sessionEndTime = moment(data.session.end_date_time).format('hh:mm a');
                if (data.session.speakers.length > 0) {
                    for (const i in data.session.speakers) {
                        this.sessionSpeakers += data.session.speakers[i].name;
                        if (parseInt(i) == data.session.speakers.length-1) {
                            // do something with element on last item in Array
                        } else {
                            this.sessionSpeakers += ', ';
                        }
                    }
                } else {
                    this.sessionSpeakers += 'No speakers are associated with this session.';
                }
            }
        );
    }

    deleteSession(Id){
        if (confirm("Do you really want to delete!")) {
            this._sessionService.deleteSession(Id).subscribe(
                success => {

                    this.toastr.success("Session has been deleted.");
                    this.router.navigate(['/session-list']);
                }
            );
        }
    }

}
