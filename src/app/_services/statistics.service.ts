import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class StatisticService {
    constructor( private _http: HttpClient) { }

    getSessionState(eventId) {
        return this._http.get<any>( environment.apiUrl + 'statistic/eventStats?event_id=' + eventId ).pipe(map(data => {
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

    getSingleSessiondata(eventId,sessionId) {

        return this._http.get<any>( environment.apiUrl + 'statistic/sessionStats?event_id='+ eventId +'&session_id=' + sessionId ).pipe(map(data => {
            if (data.code === 200) {
                return data;
            } else {
                return [];
            }
        }));
    }

    getRevenuSessionState(chartType,eventId) {
        if(chartType === 'day') {
            //return this._http.get<any>( environment.apiUrl + 'statistic/revenueStatsBy?event_id=37&filterBy=date' ).pipe(map(data => {
            return this._http.get<any>( environment.apiUrl + 'statistic/revenueStatsBy?event_id='+eventId +'&filterBy=date').pipe(map(data => {
                if (data.code === 200) {
                    return data;
                } else {
                    return [];
                }
            }));
        }

        if(chartType === 'week') {
            return this._http.get<any>( environment.apiUrl + 'statistic/revenueStatsBy?event_id=' + eventId +'&filterBy=week' ).pipe(map(data => {
            //return this._http.get<any>( environment.apiUrl + 'statistic/revenueStatsBy?event_id=37&filterBy=week' ).pipe(map(data => {
                if (data.code === 200) {
                    return data;
                } else {
                    return [];
                }
            }));
        }
        if(chartType === 'month') {
            return this._http.get<any>( environment.apiUrl + 'statistic/revenueStatsBy?event_id=' + eventId +'&filterBy=month' ).pipe(map(data => {
            //return this._http.get<any>( environment.apiUrl + 'statistic/revenueStatsBy?event_id=37&filterBy=month' ).pipe(map(data => {
                if (data.code === 200) {
                    return data;
                } else {
                    return [];
                }
            }));
        }
        if(chartType === 'year') {
            return this._http.get<any>( environment.apiUrl + 'statistic/revenueStatsBy?event_id=' + eventId +'&filterBy=year' ).pipe(map(data => {
           // return this._http.get<any>( environment.apiUrl + 'statistic/revenueStatsBy?event_id=37&filterBy=year' ).pipe(map(data => {
                if (data.code === 200) {
                    return data;
                } else {
                    return [];
                }
            }));
        }
    }

    getDifferenceTwoDates(currentEventStartDateTime) {
        var dateC = moment(currentEventStartDateTime);
        var dateB = moment(new Date());
        if(dateB.diff(dateC, 'days') > 7) {
            if (dateB.diff(dateC, 'days') > 49) {
                if (dateB.diff(dateC, 'days') > 365) {
                   return 'year';

                } else {
                    return 'month';
                }
            }  else {
                return 'week';
            }
        } else {
            return 'day';
        }

        /*console.log('Difference is ', dateB.diff(dateC), 'milliseconds');
        console.log('Difference is ', dateB.diff(dateC, 'days'), 'days');
        console.log('Difference is ', dateB.diff(dateC, 'months'), 'months');*/

    }
}
