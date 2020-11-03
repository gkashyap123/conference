import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SessionService} from '../../_services/session.service';
import {HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup, FormControl, NgForm, Validators} from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from '../../custom-validator.directive';

@Component({
    selector: 'app-create-session',
    templateUrl: './create-session.component.html',
    styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {

    //   FormGroup: FormGroup;
    creteSessionForm: FormGroup;
    error = '';
    userData = '';
    currentUser = '';
    currentEvent: any;
    speakerlist: any;
    speakerListCount:any;
    date: Date = new Date();
    date1: Date = new Date();
    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MM-yyyy hh:mm a',
        defaultOpen: false
    };
    selectedSpeakers: any;

    // autoCompleteCallback1(selectedData:any) {
    //     //do any necessery stuff.
    //     console.log(selectedData);
    // }

    constructor(private _sessionService: SessionService,
                private formBuilder: FormBuilder,
                private toastr: ToastrService,
                private router: Router) {
        this.selectedSpeakers = [];
    }

    ngOnInit() {

        if (!localStorage.getItem('currentEvent')) {
            this.router.navigate(['/my-conference']);
        }

        this.creteSessionForm = new FormGroup({
            'title': new FormControl('', Validators.required),
            'description': new FormControl('', Validators.required),
             'address': new FormControl('',Validators.required),
            'total_tickets': new FormControl('', CustomValidators.vaildNumber),
            'ticket_type': new FormControl('',Validators.required),
            'from': new FormControl('', Validators.required),
             'to': new FormControl('', Validators.required),
            'speaker': new FormControl('')
        });

        this.getSpeakerListData();
    }

    getSpeakerListData() {
        this._sessionService.getSpeakerList().subscribe(
            data => {
                this.speakerlist = data.Speaker;

                var keys = Object.keys(this.speakerlist);
                this.speakerListCount = keys.length;
            }
        );
    }

    postSessionData() {
        this.currentEvent = localStorage.getItem('currentEvent');
        const headers = new HttpHeaders();
        headers.set('Accept', 'application/json');
        headers.append('Content-Type', 'multipart/form-data');

        if (this.creteSessionForm.valid) {

            const formData: FormData = new FormData();
            formData.append('title', this.creteSessionForm.value.title);
            formData.append('description', this.creteSessionForm.value.description);
            formData.append('address', this.creteSessionForm.value.address);
            formData.append('total_tickets', this.creteSessionForm.value.total_tickets);
            formData.append('ticket_type', this.creteSessionForm.value.ticket_type);
            formData.append('start_date_time', moment(this.creteSessionForm.value.from).toISOString());
            formData.append('end_date_time', moment(this.creteSessionForm.value.to).toISOString());
            formData.append('latitude', '0');
            formData.append('longitude', '0');
            formData.append('event_id', this.currentEvent);
            formData.append('speakers_id', JSON.stringify(this.selectedSpeakers));
            formData.append('user_id', JSON.parse(localStorage.getItem('currentUser')).user.user_id);

            this._sessionService.addSession(formData, headers).subscribe(response => {
                console.log(response);
                this.toastr.success("Session has been Added.");
                this.router.navigate(['/session-list']);
            }, error => {
                console.log(error);

            });

        } else {
            this.validateAllFormFields(this.creteSessionForm);
        }
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    updateSelectedSpeakers(event) {
        if (event.target.checked) {
            this.selectedSpeakers.push(event.target.value);
        } else {
            this.selectedSpeakers.pop(event.target.value);
        }

        console.log(this.selectedSpeakers);
    }

    onFromDateSelect(event) {
        const momentDate = moment(this.date);
        const momentDate1 = moment(this.date1);
        if (momentDate > momentDate1) {
            this.date1 = this.date;
        }
    }

    onToDateSelect(event) {
        const momentDate = moment(this.date);
        const momentDate1 = moment(this.date1);
        if (momentDate1 < momentDate) {
            this.date = this.date1;
        }
    }
}
