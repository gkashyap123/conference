import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GuestService } from '../_services/guest.service';
import { SessionService } from '../_services/session.service';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from '../custom-validator.directive';

@Component({
    selector: 'app-create-guest',
    templateUrl: './create-guest.component.html',
    styleUrls: ['./create-guest.component.css']
})
export class CreateGuestComponent implements OnInit {

    public uploadImage: any;
    currentEvent: string;
    eventSessions: any;
    eventSessionsCount:any;
    sessionBased;
    selectedSessions;
    updateGuestForm: FormGroup;

    constructor(private _guestService: GuestService,
        private _sessionService: SessionService,
        private router: Router,
        private toastr: ToastrService,
        private formBuilder: FormBuilder) {
        this.sessionBased = 1;
        this.selectedSessions = [];
    }

    ngOnInit() {
        if (!localStorage.getItem('currentEvent')) {
            this.router.navigate(['/my-conference']);
        }

        this.currentEvent = localStorage.getItem('currentEvent');
        this.updateGuestForm = new FormGroup({
            'guestName': new FormControl('', Validators.required),
            'guestEmail': new FormControl('', [CustomValidators.vaildEmail, Validators.minLength(4), Validators.maxLength(50)]),
            'guestMobile': new FormControl('')
        });

        this.getEventSessions();
    }

    addGuest() {
        if (this.updateGuestForm.valid) {
            const headers = new HttpHeaders();
            headers.set('Accept', 'application/json');
            headers.append('Content-Type', 'multipart/form-data');

            const formData: FormData = new FormData();
            formData.append('name', this.updateGuestForm.value.guestName);
            formData.append('email', this.updateGuestForm.value.guestEmail);
            formData.append('mobile', this.updateGuestForm.value.guestMobile);
            formData.append('event_id', localStorage.getItem('currentEvent'));
            formData.append('userImage', this.uploadImage);
            formData.append('guest_type', '1');
            formData.append('sessions', JSON.stringify(this.selectedSessions));

            this._guestService.addGuest(formData, headers)
                .subscribe(
                    data => {
                        // if (data.code === 200) {
                            this.toastr.success("Guest has been added.");
                            this.router.navigate(['/guest-list']);
                        // }
                    },
                    error => {

                    });
        } else {
            this.validateAllFormFields(this.updateGuestForm);
        }
    }

    getEventSessions() {
        this._sessionService.getSessions(this.currentEvent).subscribe(
            data2 => {
               this.eventSessions = data2.session_list;
                var keys = Object.keys(this.eventSessions);
                this.eventSessionsCount = keys.length;

            }
        );
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
            for (let i = 0; i < this.selectedSessions.length; i++) {
                if (this.selectedSessions[i] === event.target.value) {
                    this.selectedSessions.splice(i, 1);
                }
            }
        }
        console.log(this.selectedSessions);
    }

}
