import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {StatisticService} from "../_services/statistics.service";

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

    public sessionlist: any;
    public currentEvent: any;
    constructor(private _statisticService:StatisticService,private httpService: HttpClient) {
        this.currentEvent = localStorage.getItem('currentEvent');
    }
    ngOnInit() {
        this.getSessionList(this.currentEvent);
    }

    getSessionList(eventId) {
        this._statisticService.getSessions(eventId).subscribe(
            data => {
                this.sessionlist = data;
            },
            (err: HttpErrorResponse) => {
                console.log (err.message);
            }
        );
    }
}
