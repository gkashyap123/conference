import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ConferenceService } from '../_services/conference.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-my-conference',
    templateUrl: './my-conference.component.html',
    styleUrls: ['./my-conference.component.css']
})
export class MyConferenceComponent implements OnInit {

    public draftConferences: any;
    public liveConferences: any;
    public pastConferences: any;

    public draftCount: any;
    public liveCount: any;
    public pastCount: any;

    constructor(private _conferenceService: ConferenceService,
        private router: Router,
        private toastr: ToastrService) {
    }

    ngOnInit() {

        if (localStorage.getItem('currentEvent')) {
            localStorage.removeItem('currentEvent');
        } else {
            this.router.navigate(['/my-conference']);
        }

        // Get current user id.
        const currentUserId = JSON.parse(localStorage.getItem('currentUser')).user.user_id;

        this.getConference('draft', currentUserId);
        this.getConference('live', currentUserId);
        this.getConference('past', currentUserId);
    }

    getConference(type, userId) {
        this._conferenceService.getConferenceList(type, userId).subscribe(
            data => {
                if (type === 'draft') {
                    this.draftConferences = data.draft;
                    this.draftCount = data.count;
                } else if (type === 'live') {
                    this.liveConferences = data.live;
                    this.liveCount = data.count;
                } else {
                    this.pastConferences = data.past;
                    this.pastCount = data.count;
                }
            }
        );
    }

    selectEvent(eventId, eventMongoId, eventType, eventBookingStartDate) {

        localStorage.setItem('currentEvent', eventId);
        localStorage.setItem('currentEventMongoId', eventMongoId);
        localStorage.setItem('currentEventType', eventType);
        localStorage.setItem('currentEventBookingStartDate', eventBookingStartDate);
        this.router.navigate(['/conference-preview']);
        console.log(localStorage);
    }

    deleteEvent(id) {
        if (confirm('Are you sure want to delete?')) {
            this._conferenceService.deleteEvent(id).subscribe(
                data => {
                    const currentUserId = JSON.parse(localStorage.getItem('currentUser')).user.user_id;
                    this.getConference('draft', currentUserId);
                    this.getConference('live', currentUserId);
                    this.getConference('past', currentUserId);
                }
            );
        }
    }

    publishEvent(id) {

        if (confirm('Are you sure for Publish?')) {
            this._conferenceService.publishEvent(id).subscribe(
                data => {
                    if (data['code'] === 200) {
                        this.toastr.success('Event has been published.');
                        const currentUserId = JSON.parse(localStorage.getItem('currentUser')).user.user_id;
                        this.getConference('draft', currentUserId);
                        this.getConference('live', currentUserId);
                        this.getConference('past', currentUserId);
                    } else {
                        this.toastr.error(data['message']);
                    }
                }
            );
        }
    }

    unPublishEvent(Id){

        if (confirm('Are you sure for Unpublish?')) {
            this._conferenceService.unpublishEvent(Id).subscribe(
                data => {
                    if (data['code'] == 200) {
                        this.toastr.success('Event has been unpublished.');
                        const currentUserId = JSON.parse(localStorage.getItem('currentUser')).user.user_id;
                        this.getConference('draft', currentUserId);
                        this.getConference('live', currentUserId);
                        this.getConference('past', currentUserId);
                    } else {
                        this.toastr.error(data['message']);
                    }
                }
            );
        }
    }

}
