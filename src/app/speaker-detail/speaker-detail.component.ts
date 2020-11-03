import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {SpeakerService} from '../_services/speaker.service';

@Component({
    selector: 'app-speaker-detail',
    templateUrl: './speaker-detail.component.html',
    styleUrls: ['./speaker-detail.component.css']
})
export class SpeakerDetailComponent implements OnInit {
    public speakerData: any;
    public  currentEventId:any;
    public currentEventType:any;
    public  speakerId:any;
    public EventType = 'draft';
    constructor(private speakerService:SpeakerService,private router: Router) {
        console.log(localStorage);
        if (localStorage.getItem('currentEvent')) {
            this.currentEventId = localStorage.getItem('currentEvent');
            this.currentEventType = localStorage.getItem('currentEventType');
            this.speakerId = localStorage.getItem('speakerId');
            // alert(this.speakerId);
        } else {
            this.router.navigate(['/my-conference']);
        }
        this.speakerData={
            'speakerImage':'',
            'name':'',
            'qualification':'',
            'email':'',
        }

        this.getSpeakersDetail(this.speakerId);
    }

    ngOnInit() {

    }

    getSpeakersDetail(speaker_id) {
        this.speakerService.getSpeakersDetail(speaker_id).subscribe(
            data => {
                this.speakerData = data.Speaker;
                console.log(this.speakerData);
            }
        );
    }

    delete_speaker(event_id,speaker_id) {
        if (confirm("Are you sure you want to delete!")) {

            let speaker_detail = {event_id: event_id, speaker_id: speaker_id};
            this.speakerService.deleteSpeaker(speaker_detail).subscribe(
                data => {
                    if (data.code === 200) {
                        this.router.navigate(['/speaker-list']);
                    } else {

                    }
                }
            );
        }
    }

}
