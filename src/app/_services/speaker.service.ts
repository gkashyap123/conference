import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

    constructor( private http: HttpClient) { }

    insertSpeaker(speakerObj,headers) {
       return this.http.post(`${environment.apiUrl}speaker/addSpeaker`, speakerObj,{headers});
    }

    updateSpeaker(speakerObj,headers) {
        return this.http.post(`${environment.apiUrl}speaker/updateSpeaker`, speakerObj,{headers});
    }

    getSpeakerList(event_id) {
        //http://stgsd.appsndevs.com:9048/speaker/speakerList?event_id=1&session_id=2
        return this.http.get<any>( environment.apiUrl + 'speaker/speakerList/?event_id='+event_id).pipe(map(data => {
            if (data.code === 200) {
                return data;
            } else {
                return [];
            }
        }))
    }

    getSpeakersDetail(speaker_id) {
        //http://stgsd.appsndevs.com:9048/speaker/speakerDetail?speaker_id
        return this.http.get<any>( environment.apiUrl + 'speaker/speakerDetail?speaker_id='+speaker_id).pipe(map(data => {
            if (data.code === 200) {
                return data;
            } else {
                return [];
            }
        }))
    }

    deleteSpeaker(speakerDetail) {

        return this.http.post<any>( environment.apiUrl + 'speaker/deleteSpeaker',speakerDetail).pipe(map(data => {
            if (data.code === 200) {
                return data;
            } else {
                return [];
            }
        }))
    }
}
