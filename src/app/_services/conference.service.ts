import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';



@Injectable({
    providedIn: 'root'
})
export class ConferenceService {

    public currentEvent: any;

    constructor(private _http: HttpClient) { }

    getConferenceList(type, userId) {

        return this._http.get<any>(environment.apiUrl + 'event/' +type+ '?user_id=' + userId).pipe(map(data => {
            if (data.code === 200) {
                return data;
            } else {
                return [];
            }
        }))
    }
    insertEvent(eventObj, headers) {
        return this._http.post(`${environment.apiUrl}event/createEvent`, eventObj, { headers }).pipe(map(data => {
           return data;
        }))
    }

    updateEvent(eventObj, headers) {
        return this._http.post(`${environment.apiUrl}event/updateEvent`, eventObj, { headers }).pipe(map(data => {
            return data;
        }))
    }

    deleteEvent(id) {
        console.log(id);
        return this._http.get(`${environment.apiUrl}event/delete_event/`+id);
    }

    publishEvent(id) {
        return this._http.get(`${environment.apiUrl}event/publishEvent?event_id=`+id);
    }

    unpublishEvent(id) {
        return this._http.get(`${environment.apiUrl}event/unPublishEvent?event_id=`+id);
    }



    getEventTypeAndCategory() {

        return this._http.get<any>(environment.apiUrl + 'event/getEventCategory').pipe(map(data => {
            if (data.code === 200) {
                return data;
            } else {
                return [];
            }
        }))
    }

    getEventDetails() {
        this.currentEvent = localStorage.getItem('currentEvent');
        return this._http.get<any>(environment.apiUrl + 'event/eventdetails?event_id='+ this.currentEvent).pipe(map(data => {
            if (data.code === 200) {
                return data;
            } else {
                return [];
            }
        }))
    }

}
