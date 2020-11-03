import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {GuestService} from '../_services/guest.service';

@Component({
    selector: 'app-guest-list',
    templateUrl: './guest-list.component.html',
    styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnInit {

    guests: any;
    public guestListCount:any;
    public currentEventType:any;
    public isVisible = false;

    constructor(private _guestService: GuestService,
                private router: Router) {
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

        this.getGuests();
    }

    getGuests() {
        this._guestService.getGuests(localStorage.getItem('currentEvent')).subscribe(
            data => {
                this.guests = data.Guest;
                var keys = Object.keys(this.guests);
                this.guestListCount = keys.length;
            }
        );
    }

}
