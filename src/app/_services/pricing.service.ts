import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PricingService {

    constructor(private _http: HttpClient) {
    }

    updateSessionPrice(sessionData) {
        return this._http.post(environment.apiUrl + 'session/updatePriceSession', sessionData).pipe(map(data => {
            return data;
        }));
    }

    updateEventPrice(eventData) {
        return this._http.post(environment.apiUrl + 'event/updatePriceEvent', eventData).pipe(map(data => {
            return data;
        }));
    }

}
