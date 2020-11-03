import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Session } from '../_models/session';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor( private _http: HttpClient) { }

    private eventValue: any;

    private currentEvent = '';

    getSessionList() {
        this.currentEvent = localStorage.getItem('currentEvent');
        return this._http.get<any>( environment.apiUrl + 'session/session_list?event_id='+ this.currentEvent ).pipe(map(data => {
            if (data.code === 200) {
                return data;
            } else {
                return [];
            }
        }))
    }

    getSessions(eventId) {
        return this._http.get<any>( environment.apiUrl + 'session/session_list?event_id=' + eventId ).pipe(map(data => {
            if (data.code === 200) {
                return data;
            } else {
                return [];
            }
        }));
    }

    getSpeakerList() {
        this.currentEvent = localStorage.getItem('currentEvent');
        return this._http.get<any>( environment.apiUrl + 'speaker/speakerList?event_id='+ this.currentEvent).pipe(map(data => {
            if (data.code === 200) {
                return data;
            } else {
                return [];
            }
        }))
    }

    addSession(session,headers) {
       return this._http.post<any>( environment.apiUrl + 'session/createSession' ,session,{headers});
    }


    getSession(Id) {
        return this._http.get<any>( environment.apiUrl + 'session/sessiondetails/'+ Id).pipe(map(data => {
            if (data.code === 200) {
                return data;
            } else {
                return [];
            }
        }))
    }

    deleteSession(Id) {
        return this._http.get<any>( environment.apiUrl + 'session/deleteSession/'+ Id).pipe(map(data => {
            if (data.code === 200) {
                return data;
            } else {
                return [];
            }
        }))
    }

    updateSession(params, headers) {
        console.log(params);

        return this._http.post<any>( environment.apiUrl + 'session/updateSession',params,{headers}).pipe(map(data => {
            if (data.code === 200) {
                return data;
            } else {
                return [];
            }
        }))
    }
}
