import { Component, OnInit } from '@angular/core';
import {SessionService } from '../_services/session.service';
import { ActivatedRoute} from '@angular/router';
import {HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, FormControl, NgForm, Validators} from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from '../custom-validator.directive';



@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent implements OnInit {

    public sessionEditDetail: FormGroup;
    public sessionId: any;
    date: Date = new Date();
    date1: Date = new Date();
    public currentEvent: any;
    speakerlist: any;
    speakerCount:any;
    sessionDetail: any;
    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MM-yyyy hh:mm a',
        defaultOpen: false
    };
   // creteSessionForm: FormGroup;
    addedSpeaker: any;

    selectedSpeakers: any;




  constructor(private _sessionService: SessionService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router) {
      this.sessionId = activatedRoute.snapshot.params.id;
      this.selectedSpeakers = [];
  }

  ngOnInit() {

    if (!localStorage.getItem('currentEvent')) {
        this.router.navigate(['/my-conference']);
    }

      this.sessionEditDetail = new FormGroup({
        'title': new FormControl('', Validators.required),
        'description': new FormControl('', Validators.required),
        'address': new FormControl('', Validators.required),
        'total_tickets': new FormControl('', CustomValidators.vaildNumber),
        'ticket_type': new FormControl('', Validators.required),
        'from': new FormControl('', Validators.required),
         'to': new FormControl('', Validators.required),
        'speaker': new FormControl('')
    });

    this.editSessionData(this.sessionId);
  }

    editSessionData( sessionId ) {
        this._sessionService.getSession(sessionId).subscribe(
            data => {
                this.sessionDetail = data.session;
                console.log(this.sessionDetail);

                this.date = moment(data.session.start_date_time).toDate();
                this.date1 = moment(data.session.end_date_time).toDate();

                // Service to get all speakers associated with event.
                this._sessionService.getSpeakerList().subscribe(
                    data2 => {
                        this.speakerlist = data2.Speaker;
                        if(this.speakerlist) {
                            var keys = Object.keys(this.speakerlist);
                            if (keys.length > 0) {
                                this.speakerCount = keys.length;
                            } else {
                                this.speakerCount = 0;
                            }
                        } else {
                            this.speakerCount = 0;
                        }

                        // Set checked false for all the speakers.
                        for(const j in this.speakerlist){
                            this.speakerlist[j].checked = false;
                        }

                        console.log("speakerList", this.speakerlist);
                        // if there are selected speakers of the event.
                        if(data.session.speakers){
                            this.addedSpeaker = data.session.speakers;
                            console.log('added speakers', this.addedSpeaker);
                            for (const i in this.addedSpeaker) {
                                this.selectedSpeakers.push(this.addedSpeaker[i]._id);
                                for(const j in this.speakerlist){
                                    if(this.addedSpeaker[i]._id === this.speakerlist[j]._id){
                                        this.speakerlist[j].checked = true;
                                    }
                                }
                            }
                            console.log('speaker list ', this.speakerlist);
                        }
                        console.log('pssth vale', data2.session);

                        this.sessionEditDetail.patchValue({
                            "title": this.sessionDetail.title,
                            "description": this.sessionDetail.description,
                            "address": this.sessionDetail.address,
                            "speaker": this.sessionDetail.speaker,
                            "total_tickets": this.sessionDetail.total_tickets,
                            "ticket_type": this.sessionDetail.ticket_type,
                        });
                    }
                );
            }
        );
    }


    saveSession(session_id) {

        this.currentEvent = localStorage.getItem('currentEvent');
        const headers = new HttpHeaders();
        headers.set('Accept', 'application/json');
        headers.append('Content-Type', 'multipart/form-data');

        if (this.sessionEditDetail.valid) {

            const formData: FormData = new FormData();
            formData.append('title', this.sessionEditDetail.value.title);
            formData.append('description', this.sessionEditDetail.value.description);
            formData.append('address', this.sessionEditDetail.value.address);
            formData.append('ticket_type', this.sessionEditDetail.value.ticket_type);
            formData.append('total_tickets', this.sessionEditDetail.value.total_tickets);
            formData.append('start_date_time', moment(this.sessionEditDetail.value.from).toISOString());
            formData.append('end_date_time', moment(this.sessionEditDetail.value.to).toISOString());
            formData.append('user_id', JSON.parse(localStorage.getItem('currentUser')).user.user_id);
            formData.append('speakers_id', JSON.stringify(this.selectedSpeakers));
            formData.append('session_id', session_id);


            console.log(this.sessionEditDetail.value);

            this._sessionService.updateSession(formData, headers).subscribe(response => {
                console.log(response);
                this.toastr.success("Session has been Updated.");
                this.router.navigate(['/session-list']);
            }, error => {
                console.log(error);

            });
        } else {
           this.validateAllFormFields(this.sessionEditDetail);
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
      console.log(event);
        if (event.target.checked === true) {
            this.selectedSpeakers.push(event.target.value);
        } else {
            for ( let i = 0; i < this.selectedSpeakers.length; i++) {
                if ( this.selectedSpeakers[i] === event.target.value) {
                    this.selectedSpeakers.splice(i, 1);
                }
            }
        }
        console.log(this.selectedSpeakers);
    }

    onfromDateSelect(event) {
        const momentDate = moment(this.date);
        const momentDate1 = moment(this.date1);
        if (momentDate > momentDate1) {
            this.date1 = this.date;
        }
    }

    ontoDateSelect(event) {
        const momentDate = moment(this.date);
        const momentDate1 = moment(this.date1);
        if (momentDate1 < momentDate) {
            this.date = this.date1;
        }
    }
}
