import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GuestService {

    constructor(private _http: HttpClient) {
    }

    getGuests(eventId) {
        return this._http.get<any>(environment.apiUrl + 'guest/guestList?event_id=' + eventId).pipe(map(data => {
            if (data.code === 200) {
                return data;
            } else {
                return [];
            }
        }));
    }

    getGuestDetail(guestId) {
        return this._http.get<any>(environment.apiUrl + 'guest/guestDetail?guest_id=' + guestId).pipe(map(data => {
            if (data.code === 200) {
                return data;
            } else {
                return [];
            }
        }));
    }

    updateGuest(guestObj, headers) {
        return this._http.post(environment.apiUrl + 'guest/updateGuest', guestObj, {headers}).pipe(map(data => {
            return data;
        }));
    }

    addGuest(guestObj, headers) {
        return this._http.post(environment.apiUrl + 'guest/addGuest', guestObj, { headers }).pipe(map(data => {
            return data;
        }));
    }

    deleteGuest(guestData) {
        return this._http.post(environment.apiUrl + 'guest/deleteGuest', guestData).pipe(map(data => {
            return data;
        }));
    }
}
