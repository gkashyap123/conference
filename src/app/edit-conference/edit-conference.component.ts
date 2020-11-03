import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, NgForm, Validators} from '@angular/forms';
import {HttpHeaders} from '@angular/common/http';
import {ConferenceService} from '../_services/conference.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-edit-conference',
    templateUrl: './edit-conference.component.html',
    styleUrls: ['./edit-conference.component.css']
})
export class EditConferenceComponent implements OnInit {
    FormGroup: FormGroup;
    editConfrenceForm: FormGroup;
    date1: Date = new Date();
    date2: Date = new Date();
    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MM-yyyy hh:mm a',
        defaultOpen: false
    };

    public uploadImage1: any;
    public uploadImage2: any;
    public uploadImage3: any;
    public uploadImage4: any;
    public uploadImage5: any;
    loading: boolean;
    categories: any;
    types: any;
    organizer: any;
    first_name: any;
    start_date_time: any;
    end_date_time: any;
    location_name: any;
    eventType: any;
    eventCategory: any;
    title: any;
    eventImage: any;
    description: any;
    ticket_type: any;
    selectedConferenceType: any;
    selectedConferenceCategory: any;

    constructor(private formBuilder: FormBuilder,
                private conferenceService: ConferenceService,
                private router: Router, private toastr: ToastrService,
                private _conferenceService: ConferenceService) {
    }


    ngOnInit() {
        if (!localStorage.getItem('currentEvent')) {
            this.router.navigate(['/my-conference']);
        }

        this.editConfrenceForm = new FormGroup({
            'conferenceAtitle': new FormControl('', Validators.required),
            'describeYourConference': new FormControl('', Validators.required),
            'venue': new FormControl('', Validators.required),
            'from': new FormControl('', Validators.required),
            'to': new FormControl('', Validators.required),
            'conferenceFile1': new FormControl(''),
            'conferenceFile2': new FormControl(''),
            'conferenceFile3': new FormControl(''),
            'conferenceFile4': new FormControl(''),
            'conferenceFile5': new FormControl(''),
            'conferenceType': new FormControl('', Validators.required),
            'conferenceCategory': new FormControl('', Validators.required),
            'ticketType': new FormControl('', Validators.required),
        });

        this.getEventTypeAndCategoryList();
        this.getEventDetails();
    }

    editConfrenceEvent() {
        if (this.editConfrenceForm.valid) {

            let headers = new HttpHeaders();
            headers.set('Accept', 'application/json');
            headers.append('Content-Type', 'multipart/form-data');

            let userInfo = localStorage.getItem('currentUser');

            localStorage.removeItem('currentEventStartDateTime');
            localStorage.setItem('currentEventStartDateTime', moment(this.editConfrenceForm.value.from).format());

            const formData: FormData = new FormData();
            formData.append('title', this.editConfrenceForm.value.conferenceAtitle);
            formData.append('description', this.editConfrenceForm.value.describeYourConference);
            formData.append('location_name', this.editConfrenceForm.value.venue);
            formData.append('start_date_time', moment(this.editConfrenceForm.value.from).format());
            formData.append('end_date_time', moment(this.editConfrenceForm.value.to).format());
            formData.append('eventType', this.editConfrenceForm.value.conferenceType);
            formData.append('eventCategory', this.editConfrenceForm.value.conferenceCategory);
            formData.append('ticket_type', this.editConfrenceForm.value.ticketType);
            formData.append('user_id', JSON.parse(userInfo).user.user_id);
            formData.append('lat', '0');
            formData.append('lng', '0');
            formData.append('eventImage', this.uploadImage1);
            formData.append('eventImage2', this.uploadImage2);
            formData.append('eventImage3', this.uploadImage3);
            formData.append('eventImage4', this.uploadImage4);
            formData.append('eventImage5', this.uploadImage5);
            formData.append('event_id', localStorage.getItem('currentEvent'));

            this.conferenceService.updateEvent(formData, headers)
                .subscribe(
                    data => {
                        this.toastr.success('Event has been updated.');
                        this.router.navigate(['/conference-preview']);

                    },
                    error => {
                        // this.alertService.error(error);
                        this.loading = false;
                    });
        } else {

            this.validateAllFormFields(this.editConfrenceForm);
        }

    }


    /**
     *
     * @param formGroup
     * @author Sandeep Singh
     */
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

    onDateSelect($event): void {
        console.log($event);
    }

    captureFile1(event) {
        const fileList: FileList = event.target.files;
        const file: File = fileList[0];
        this.uploadImage1 = file;

    }

    captureFile2(event) {
        const fileList: FileList = event.target.files;
        const file: File = fileList[0];
        this.uploadImage2 = file;

    }

    captureFile3(event) {
        const fileList: FileList = event.target.files;
        const file: File = fileList[0];
        this.uploadImage3 = file;

    }

    captureFile4(event) {
        const fileList: FileList = event.target.files;
        const file: File = fileList[0];
        this.uploadImage4 = file;

    }

    captureFile5(event) {
        const fileList: FileList = event.target.files;
        const file: File = fileList[0];
        this.uploadImage5 = file;

    }

    getEventTypeAndCategoryList() {
        this._conferenceService.getEventTypeAndCategory().subscribe(
            data => {
                this.categories = data.category;
                this.types = data.type;
            }
        );
    }

    getEventDetails() {
        this._conferenceService.getEventDetails().subscribe(
            data => {

                this.date1 = moment(data.event.start_date_time).toDate();
                this.date2 = moment(data.event.end_date_time).toDate();
                this.editConfrenceForm.patchValue({
                    'conferenceAtitle': data.event.title,
                    'describeYourConference': data.event.description,
                    'conferenceType': data.event.eventType,
                    'conferenceCategory': data.event.eventCategory,
                    'venue': data.event.location_name,
                    'ticketType': data.event.ticket_type
                });

            }
        );
    }

    onFromDateSelect(event) {
        const momentDate = moment(this.date1);
        const momentDate1 = moment(this.date2);
        if (momentDate > momentDate1) {
            this.date2 = this.date1;
        }
    }

    onToDateSelect(event) {
        const momentDate = moment(this.date1);
        const momentDate1 = moment(this.date2);
        if (momentDate1 < momentDate) {
            this.date1 = this.date2;
        }
    }
}
