import { Component, OnInit } from '@angular/core';
import { ConferenceService } from '../_services/conference.service'
import { Router } from "@angular/router";
import { ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    public sessionId: any;
    first_name: any;
    public speakerId: any;
    public guestId: any;


    constructor(private _conferenceService: ConferenceService,
                private conferenceService: ConferenceService,
                private activatedRoute: ActivatedRoute,
                private _activatedRoute: ActivatedRoute,
                private router: Router
    ) {
        this.sessionId = activatedRoute.snapshot.params.id;
        this.speakerId = _activatedRoute.snapshot.params.id;
        this.guestId = this.activatedRoute.snapshot.params.id;}

    ngOnInit() {
        this.getEventTypeAndCategoryList();
    }
    getEventTypeAndCategoryList() {
        this._conferenceService.getEventDetails().subscribe(
            data => {
                this.first_name = data.event.title;
            }
        );
    }

}
