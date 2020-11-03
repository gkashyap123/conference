import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

import {GuestService} from '../_services/guest.service';

@Component({
    selector: 'app-guest-detail',
    templateUrl: './guest-detail.component.html',
    styleUrls: ['./guest-detail.component.css']
})
export class GuestDetailComponent implements OnInit {

    guestDetail: any;
    guestSessions: string;
    guestId: number;
    public currentEventType:any;
    public isVisible = false;

    constructor(private _guestService: GuestService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
        this.guestSessions = '';
    }

    ngOnInit() {

        if (!localStorage.getItem('currentEvent')) {
            this.router.navigate(['/my-conference']);
        }

        if(localStorage.getItem('currentEvent')){
            this.currentEventType = localStorage.getItem('currentEventType');
            if (this.currentEventType === 'draft') {
                this.isVisible = true;
            }
        }

        this.guestId = this.activatedRoute.snapshot.params.id;
        this.getGuestDetail(this.guestId);
    }

    getGuestDetail(guestId) {
        this._guestService.getGuestDetail(guestId).subscribe(
            data => {
                this.guestDetail = data.Guest;
                if (data.Guest.buyEvent) {
                    if (data.Guest.buyEvent.sessions) {
                        if (data.Guest.buyEvent.sessions.length > 0) {
                            for (const i in data.Guest.buyEvent.sessions) {
                                this.guestSessions += data.Guest.buyEvent.sessions[i].title;
                                if (parseInt(i) === data.Guest.buyEvent.sessions.length - 1) {
                                    // do something with element on last item in Array
                                } else {
                                    this.guestSessions += ', ';
                                }
                            }
                        } else {
                            this.guestSessions += 'This guest has no sessions.';
                        }
                    }
                }
            }
        );
    }

    removeGuest(guestId) {
        const guestData = {
            'guest_id': guestId
        };
        if (confirm('Are you sure want to delete?')) {
            this._guestService.deleteGuest(guestData).subscribe(
                data => {
                    this.router.navigate(['/guest-list']);
                }
            );
        }
    }

}
