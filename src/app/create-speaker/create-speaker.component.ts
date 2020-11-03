import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';

import {SpeakerService} from '../_services/speaker.service'
import {first} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from '../custom-validator.directive';

@Component({
  selector: 'app-create-speaker',
  templateUrl: './create-speaker.component.html',
  styleUrls: ['./create-speaker.component.css']
})
export class CreateSpeakerComponent implements OnInit {
   // FormGroup: FormGroup;
    loading = false;
    createSpeakerForm: FormGroup;
   // submitted: boolean;
    error = '';
    public  currentEvent:any;
    public  userData:any;
    public  currentUser:any;
    public  uploadImage: any;
    constructor(private formBuilder: FormBuilder,
        private speakerService:SpeakerService,
                private toastr: ToastrService,
        private router: Router) { }

    ngOnInit() {
        this.currentEvent = localStorage.getItem('currentEvent');
        this.userData = localStorage.getItem('currentUser');
        this.currentUser = JSON.parse(this.userData);

        if (localStorage.getItem('currentEvent')) {
            //localStorage.removeItem('currentEvent');
        } else {
            this.router.navigate(['/my-conference']);
        }

        this.createSpeakerForm = new FormGroup({
            'firstName': new FormControl('', Validators.required),
            'email':  new FormControl('', [CustomValidators.vaildEmail, Validators.minLength(4), Validators.maxLength(50)]),
            //'lastName': new FormControl('', Validators.required),
            'qualification': new FormControl('', Validators.required),
            'descriptionSpeaker': new FormControl('', Validators.required),
            'facebookUrl':  new FormControl('', [CustomValidators.webMail, Validators.minLength(0), Validators.maxLength(50)]),
            'linkdinUrl': new FormControl('', [CustomValidators.webMail, Validators.minLength(0), Validators.maxLength(50)]),
            'intstagramUrl': new FormControl('', [CustomValidators.webMail, Validators.minLength(0), Validators.maxLength(50)]),
            'speakerFile': new FormControl('', Validators.required),
        });
    }

    add_speaker_event() {
        if (this.createSpeakerForm.valid) {
            let headers = new HttpHeaders();
            headers.set('Accept', 'application/json');
            headers.append('Content-Type', 'multipart/form-data');

            const formData: FormData = new FormData();
            formData.append('name', this.createSpeakerForm.value.firstName);
            formData.append('email', this.createSpeakerForm.value.email);
            formData.append('description', this.createSpeakerForm.value.descriptionSpeaker);
            formData.append('facebook_url', this.createSpeakerForm.value.facebookUrl);
            formData.append('linkedIn_url', this.createSpeakerForm.value.linkdinUrl);
            formData.append('wikipedia_url', this.createSpeakerForm.value.intstagramUrl);
            formData.append('event_id', this.currentEvent);
            formData.append('user_id',this.currentUser.user.user_id);
            formData.append('session_id', '3');
            formData.append('qualification', this.createSpeakerForm.value.qualification);
            formData.append('speakerImage', this.uploadImage);


            this.speakerService.insertSpeaker(formData,headers)
                .subscribe(
                    data => {
                        //this.alertService.success('Speak successful', true);
                        this.toastr.success("Speaker has been Added.");
                        this.router.navigate(['/speaker-list']);
                        console.log(data);
                    },
                    error => {
                       // this.alertService.error(error);
                        this.loading = false;
                    });
        }
        else {
            this.validateAllFormFields(this.createSpeakerForm);
        }


    }

    //speakerImage
    addFileToDocument(event) {
       const fileList: FileList = event.target.files;
       const file: File = fileList[0];
       this.uploadImage = file;
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

}
