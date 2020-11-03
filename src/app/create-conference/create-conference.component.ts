/*
Module Name    : Create-Confrence
Module Purpose : Add the Confrence Event
Created date   : 08 October 2018
Created By     : Sandeep Singh
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ConferenceService } from '../_services/conference.service'
import { Router } from "@angular/router";
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-conference',
  templateUrl: './create-conference.component.html',
  styleUrls: ['./create-conference.component.css'],

})
export class CreateConferenceComponent implements OnInit {
  FormGroup: FormGroup;
  creteConfrenceForm: FormGroup;
  date1: Date = new Date();
  date2: Date = new Date();
  settings = {
      bigBanner: true,
      timePicker: true,
      format: 'dd-MM-yyyy hh:mm a',
      defaultOpen: false
  }

  public uploadImage1: any;
  public uploadImage2: any;
  public uploadImage3: any;
  public uploadImage4: any;
  public uploadImage5: any;
  loading: boolean;
  categories: any;
  types: any;


  constructor(private formBuilder: FormBuilder,
    private conferenceService: ConferenceService,
    private router: Router,
    private toastr: ToastrService,
    private _conferenceService: ConferenceService) { }

  ngOnInit() {


    this.creteConfrenceForm = new FormGroup({
      'conferenceAtitle': new FormControl('', Validators.required),
      'describeYourConference': new FormControl('', Validators.required),
      'venue': new FormControl('', Validators.required),
      'from': new FormControl('', Validators.required),
      'to': new FormControl('', Validators.required),
      'conferenceFile1': new FormControl('', Validators.required),
      'conferenceFile2': new FormControl(''),
      'conferenceFile3': new FormControl(''),
      'conferenceFile4': new FormControl(''),
      'conferenceFile5': new FormControl(''),
      'conferenceType': new FormControl('', Validators.required),
      'conferenceCategory': new FormControl('', Validators.required),
      'ticketType': new FormControl('', Validators.required),


    });

    this.getEventTypeAndCategoryList();

  }

  add_confrenceEvent() {
    if (this.creteConfrenceForm.valid) {

      let headers = new HttpHeaders();
      headers.set('Accept', 'application/json');
      headers.append('Content-Type', 'multipart/form-data');

      let userInfo = localStorage.getItem('currentUser');

      const formData: FormData = new FormData();
      formData.append('title', this.creteConfrenceForm.value.conferenceAtitle);
      formData.append('description', this.creteConfrenceForm.value.describeYourConference);
      formData.append('location_name', this.creteConfrenceForm.value.venue);
      formData.append('start_date_time', moment(this.creteConfrenceForm.value.from).toISOString());
      formData.append('end_date_time', moment(this.creteConfrenceForm.value.to).toISOString());
      formData.append('eventType', this.creteConfrenceForm.value.conferenceType);
      formData.append('eventCategory', this.creteConfrenceForm.value.conferenceCategory);
      formData.append('ticket_type', this.creteConfrenceForm.value.ticketType);
      formData.append('user_id', JSON.parse(userInfo).user.user_id);
      formData.append('lat', '0');
      formData.append('lng', '0');
      formData.append('eventImage', this.uploadImage1);
      formData.append('eventImage2', this.uploadImage2);
      formData.append('eventImage3', this.uploadImage3);
      formData.append('eventImage4', this.uploadImage4);
      formData.append('eventImage5', this.uploadImage5);

      this.conferenceService.insertEvent(formData, headers)
        .subscribe(
          data => {
            //this.alertService.success('Speak successful', true);
            this.toastr.success("Event has been added.");
            this.router.navigate(['/my-conference']);

          },
          error => {
            // this.alertService.error(error);
            this.loading = false;
          });
    } else {
      // alert("Please fill the required feilds!");
      this.validateAllFormFields(this.creteConfrenceForm);
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
        control.markAsTouched({ onlySelf: true });
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

