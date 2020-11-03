import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        const params = {
            'email'     : email,
            'password'  : password
        };
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        return this.http.post<any>(environment.apiUrl + 'organiser/login', params,{headers:headers})
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
