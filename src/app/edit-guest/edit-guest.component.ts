import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

import {GuestService} from '../_services/guest.service';
import {SessionService} from '../_services/session.service';
import {HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from '../custom-validator.directive';

@Component({
  selector: 'app-edit-guest',
  templateUrl: './edit-guest.component.html',
  styleUrls: ['./edit-guest.component.css']
})
export class EditGuestComponent implements OnInit {

    public uploadImage: any;
    guestId: string;
    currentEvent: string;
    guestDetail: any;
    guestSessions: any;
    eventSessions: any;
    eventSessionsCount:any;
    sessionBased;
    selectedSessions;
    updateGuestForm: FormGroup;

    constructor(private _guestService: GuestService,
                private _sessionService: SessionService,
                private router: Router,
                private toastr: ToastrService,
                private activatedRoute: ActivatedRoute,
                private formBuilder: FormBuilder) {
        this.guestDetail = {};
        this.guestSessions = {};
        this.sessionBased = 0;
        this.selectedSessions = [];
    }

    ngOnInit() {
        if (!localStorage.getItem('currentEvent')) {
            this.router.navigate(['/my-conference']);
        }

        this.guestId = this.activatedRoute.snapshot.params.id;
        this.currentEvent = localStorage.getItem('currentEvent');
        this.getGuestDetail(this.guestId);
        this.updateGuestForm = new FormGroup({
            'guestName': new FormControl('', Validators.required),
            'guestEmail': new FormControl('', [CustomValidators.vaildEmail, Validators.minLength(4), Validators.maxLength(50)]),
            'guestMobile': new FormControl('')
        });
    }

    getGuestDetail(guestId) {
        this._guestService.getGuestDetail(guestId).subscribe(
            data => {
                console.log(data.Guest);
                this.guestDetail = data.Guest;

                this.updateGuestForm.patchValue({
                    "guestName": this.guestDetail.name,
                    "guestEmail": this.guestDetail.email
                });

                // Service to get all sessions of the event.
                this._sessionService.getSessions(this.currentEvent).subscribe(
                    data2 => {
                        console.log('Event Sessions', data2.session_list);
                        this.eventSessions = data2.session_list;
                        if(this.eventSessions) {
                            var keys = Object.keys(this.eventSessions);
                            this.eventSessionsCount = keys.length;
                        } else {
                            this.eventSessionsCount = 0;
                        }

                        // Initially, set all event sessions checked false.
                        for (const j in this.eventSessions) {
                            this.eventSessions[j].checked = false;
                        }


                        // If there are selected sessions of this guest.
                        if (data.Guest.buyEvent) {
                            if (data.Guest.buyEvent.sessions) {
                                this.guestSessions = data.Guest.buyEvent.sessions;
                                console.log('Guest Sessions', this.guestSessions);
                                for (const i in this.guestSessions) {
                                    this.selectedSessions.push(this.guestSessions[i]._id);
                                    for (const j in this.eventSessions) {
                                        if (this.guestSessions[i]._id === this.eventSessions[j]._id){
                                            this.eventSessions[j].checked = true;
                                        }
                                    }
                                }
                                console.log('Event Sessions', data2.session_list);
                            }
                        }

                    });
            });
    }

    updateGuest() {
        if (this.updateGuestForm.valid) {
            const headers = new HttpHeaders();
            headers.set('Accept', 'application/json');
            headers.append('Content-Type', 'multipart/form-data');

            const formData: FormData = new FormData();
            formData.append('name', this.updateGuestForm.value.guestName);
            formData.append('email', this.updateGuestForm.value.guestEmail);
            formData.append('mobile', this.updateGuestForm.value.guestMobile);
            formData.append('event_id', localStorage.getItem('currentEvent'));
            formData.append('event_main_id', localStorage.getItem('currentEventMongoId'));
            formData.append('userImage', this.uploadImage);
            formData.append('guest_type', '1');
            formData.append('guest_id', this.guestId);
            formData.append('sessions', JSON.stringify(this.selectedSessions));

            this._guestService.updateGuest(formData, headers)
            .subscribe(
                data => {
                    this.toastr.success("Guest has been Updated.");
                    this.router.navigate(['/guest-list']);
                },
                error => {

                });
        } else {
            this.validateAllFormFields(this.updateGuestForm);
        }

    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    captureFile(event) {
        const fileList: FileList = event.target.files;
        const file: File = fileList[0];
        this.uploadImage = file;
    }

    captureSelectedSessions(event) {
        if (event.target.checked === true) {
            this.selectedSessions.push(event.target.value);
        } else {
            for ( let i = 0; i < this.selectedSessions.length; i++) {
                if ( this.selectedSessions[i] === event.target.value) {
                    this.selectedSessions.splice(i, 1);
                }
            }
        }
        console.log(this.selectedSessions);
    }
}
