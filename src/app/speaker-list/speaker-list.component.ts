import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {SpeakerService} from '../_services/speaker.service';
import {a} from '@angular/core/src/render3';

@Component({
    selector: 'app-speaker-list',
    templateUrl: './speaker-list.component.html',
    styleUrls: ['./speaker-list.component.css']
})
export class SpeakerListComponent implements OnInit {
    public speakerData: any;
    public  currentEventId:any;
    public speakerListCount:any;
    public currentEventType:any;
    public isVisible = false;
    constructor(private speakerService:SpeakerService,private router: Router) {
    }

    ngOnInit() {
        if (localStorage.getItem('currentEvent')) {
            this.currentEventId = localStorage.getItem('currentEvent');
            this.currentEventType = localStorage.getItem('currentEventType');
            if(this.currentEventType === 'draft') {
                this.isVisible = true;
            }
        } else {
            this.router.navigate(['/my-conference']);
        }

        this.getSpeakers(this.currentEventId);
    }
    getSpeakers(event_id) {
        this.speakerService.getSpeakerList(event_id).subscribe(
            data => {
                this.speakerData =  data.Speaker;
                var keys = Object.keys(this.speakerData);
                this.speakerListCount = keys.length;
            }
        );
    }

    getSpeakerId(speakerId) {
        localStorage.setItem('speakerId', speakerId);
        this.router.navigate(['/speaker-detail']);
        console.log(localStorage);
    }
}
