import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';

import {ActivatedRoute} from '@angular/router';
import {SpeakerService} from '../_services/speaker.service';
import {first} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from '../custom-validator.directive';


@Component({
    selector: 'app-edit-speaker',
    templateUrl: './edit-speaker.component.html',
    styleUrls: ['./edit-speaker.component.css']
})
export class EditSpeakerComponent implements OnInit {
    loading = false;
    error = '';
    public speakerId: any;
    public speakerData:any;
    public uploadImage:any;
    editSpeakerForm: FormGroup;
    public  currentEvent:any;
    public userData:any;
    public currentUser:any;

    constructor(private router: Router,private speakerService:SpeakerService,  private toastr: ToastrService,private _activatedRoute: ActivatedRoute) {
        this.speakerId = _activatedRoute.snapshot.params.id;
    }

    ngOnInit() {
        this.userData = localStorage.getItem('currentUser');
        this.currentUser = JSON.parse(this.userData);

        this.editSpeakerForm = new FormGroup({
            'firstName': new FormControl('', Validators.required),
            'email': new FormControl('', [CustomValidators.vaildEmail, Validators.minLength(4), Validators.maxLength(50)]),
            //'lastName': new FormControl('', Validators.required),
            'qualification': new FormControl('', Validators.required),
            'descriptionSpeaker': new FormControl('', Validators.required),
            'facebookUrl': new FormControl('', [CustomValidators.webMail, Validators.minLength(4), Validators.maxLength(50)]),
            'linkdinUrl': new FormControl('', [CustomValidators.webMail, Validators.minLength(4), Validators.maxLength(50)]),
            'intstagramUrl':  new FormControl('', [CustomValidators.webMail, Validators.minLength(4), Validators.maxLength(50)]),
            'speakerFile': new FormControl(''),
        });

        this.speakerData={
            'speakerImage':'',
            'name':'',
            'qualification':'',
            'email':'',
            'speakerFile':'',
        };

        this.getSpeakersDetail(this.speakerId);
    }
    cancel_edit_speaker_event() {
        this.router.navigate(['/speaker-list']);
    }

    edit_speaker_event() {

        if (this.editSpeakerForm.valid) {
            let headers = new HttpHeaders();
            headers.set('Accept', 'application/json');
            headers.append('Content-Type', 'multipart/form-data');

            const formData: FormData = new FormData();
            formData.append('name', this.editSpeakerForm.value.firstName);
            formData.append('email', this.editSpeakerForm.value.email);
            formData.append('description', this.editSpeakerForm.value.descriptionSpeaker);
            formData.append('facebook_url', this.editSpeakerForm.value.facebookUrl);
            formData.append('linkedIn_url', this.editSpeakerForm.value.linkdinUrl);
            formData.append('wikipedia_url', this.editSpeakerForm.value.intstagramUrl);
            formData.append('event_id', this.currentEvent);
            formData.append('user_id',this.currentUser.user.user_id);
            formData.append('speaker_id', this.speakerId);
            formData.append('qualification', this.editSpeakerForm.value.qualification);
            formData.append('speakerImage', this.uploadImage);


            this.speakerService.updateSpeaker(formData,headers)
                .subscribe(
                    data => {
                        //this.alertService.success('Speak successful', true);
                        this.toastr.success("Speaker has been Updated.");
                        this.router.navigate(['/speaker-list']);
                        console.log(data);
                    },
                    error => {
                        // this.alertService.error(error);
                        this.loading = false;
                    });
        }
        else {
            this.validateAllFormFields(this.editSpeakerForm);
        }


    }

    getSpeakersDetail(speaker_id) {
        this.speakerService.getSpeakersDetail(speaker_id).subscribe(
            data => {
                 this.speakerData = data.Speaker;
                 console.log(this.speakerData);

                this.editSpeakerForm.patchValue({
                    "firstName": data.Speaker.name,
                    "email": data.Speaker.email,
                    "qualification": data.Speaker.qualification,
                    "descriptionSpeaker": data.Speaker.description,
                    "facebookUrl": data.Speaker.facebook_url,
                    "linkdinUrl": data.Speaker.linkedIn_url,
                    "intstagramUrl": data.Speaker.wikipedia_url,
                    "speakerImage": data.Speaker.speakerImage,
                });
            }
        );
    }

    //edit speakerImage
    addFileToDocument(event) {
        const fileList: FileList = event.target.files;
        const file: File = fileList[0];

        if(file) {
            this.uploadImage = file;
        } else {
            this.uploadImage = '';
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
}
