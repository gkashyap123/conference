import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, NgForm, Validators} from '@angular/forms';
import {HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import * as moment from 'moment';

import {ConferenceService} from '../_services/conference.service';
import {SessionService} from '../_services/session.service';
import {PricingService} from '../_services/pricing.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-pricing',
    templateUrl: './pricing.component.html',
    styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
    FormGroup: FormGroup;
    conferencePricingForm: FormGroup;
    date1: Date = new Date();
    currentEventId;
    eventSessions;
    conferenceCurrency;
    conferencePrice;
    conferenceTicketType;

    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MM-yyyy hh:mm a',
        defaultOpen: false
    };

    ticketType;

    constructor(private formBuilder: FormBuilder,
                private conferenceService: ConferenceService,
                private router: Router,
                private _sessionService: SessionService,
                private _pricingService: PricingService,
                private toastr: ToastrService,
                private _conferenceService: ConferenceService) {
        this.currentEventId = localStorage.getItem('currentEvent');
        this.eventSessions = [];
    }

    ngOnInit() {
        this.ticketType = 1;
        this.conferencePricingForm = new FormGroup({
            'selectBookingStartDate': new FormControl('', Validators.required),
            'fullConferencePrice': new FormControl('', Validators.required),
            'fullConferenceTicketType': new FormControl(''),
            'fullConferenceCurrency': new FormControl('')
        });

        this.getEventDetails();
        this.getEventSessions(this.currentEventId);
    }

    getEventDetails() {
        this._conferenceService.getEventDetails().subscribe(
            data => {
                this.date1 = moment(data.event.bookingStartDate).toDate();
                this.conferenceCurrency = data.event.currency;
                this.conferencePrice = data.event.ticket_price;
                this.conferenceTicketType = data.event.ticket_type;
                this.conferencePricingForm.patchValue({
                    'fullConferencePrice': data.event.ticket_price,
                    'fullConferenceTicketType': data.event.ticket_type
                });

            }
        );
    }

    getEventSessions(eventId) {
        this._sessionService.getSessions(eventId).subscribe(
            data => {
                this.eventSessions = data.session_list;
            }
        );
    }

    setSessionPrice(sessionObj) {
        const sessionData = {
            session_id: sessionObj.session_id,
            ticket_price: sessionObj.ticket_price,
            ticket_type: '2'
        };
        this._pricingService.updateSessionPrice(sessionData).subscribe(
            data => {
                this.toastr.success("Session Price has been updated.");
            }
        );
    }

    setEventPrice() {
        let sessionData = {};
        console.log(this.conferenceTicketType);
        if (this.conferenceTicketType == '2'   ) {
            sessionData = {
                event_id: this.currentEventId,
                ticket_price: this.conferencePrice,
                ticket_type: '2',
                currency: this.conferenceCurrency,
                bookingStartDate: moment(this.date1).toISOString()
            };
        } else if (this.conferenceTicketType == '1') {
            sessionData = {
                event_id: this.currentEventId,
                ticket_price: '0',
                ticket_type: '1',
                currency: '',
                bookingStartDate: moment(this.date1).toISOString()
            };
        }
        this._pricingService.updateEventPrice(sessionData).subscribe(
            data => {
                this.toastr.success("Event Price has been updated.");
            }
        );
    }
}
