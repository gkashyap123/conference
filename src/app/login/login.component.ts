import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import {AuthenticationService} from '../_services/authentication.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(

        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,private toastr:ToastrService) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            emailId: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.emailId.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                    if(data.code === 200) {
                        this.router.navigate([this.returnUrl]);
                    } else {
                        this.toastr.error(data.message);
                        this.loading = false;
                    }
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
