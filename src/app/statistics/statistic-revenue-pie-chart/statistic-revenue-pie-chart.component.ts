import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {StatisticService} from "../../_services/statistics.service";

@Component({
    selector: 'app-statistic-revenue-pie-chart',
    templateUrl: './statistic-revenue-pie-chart.component.html',
    styleUrls: ['./statistic-revenue-pie-chart.component.css']
})
export class StatisticRevenuePieChartComponent implements OnInit {

    public sessionlist: any;
    public currentEvent: any;
    public selectedSessionId: any;

    public bookedStat: any;
    public remainingStat: any;

    constructor(private _statisticService: StatisticService,private httpService: HttpClient) {
        this.currentEvent = localStorage.getItem('currentEvent');
        this.bookedStat = 45;
        this.remainingStat = 55;
    }

    ngOnInit() {
        this.getSessionList(this.currentEvent);
        //this.get_session_ticket(6);

    }

    pieChartOptions = {
        responsive: true

    }

    pieChartLabels =  ['Booked Tickets', 'Remaining Tickets'];

    // CHART COLOR.
    pieChartColor:any = [
        {
            backgroundColor: ['rgba(30, 169, 224, 0.8)',
                'rgba(255,165,0,0.9)',
                'rgba(139, 136, 136, 0.9)',
                'rgba(255, 161, 181, 0.9)',
                'rgba(255, 102, 0, 0.9)'
            ]
        }
    ]

    pieChartData:any = [
        {
           data: [0,0]
        }
    ];



    /**
     * To get Session listing from drop down
     * @param eventId
     */

    getSessionList(eventId) {
        this._statisticService.getSessions(eventId).subscribe(
            data => {
                if(data.session_list.length > 0) {
                    this.selectedSessionId = data.session_list[0].session_id;
                    this._statisticService.getSingleSessiondata(this.currentEvent,data.session_list[0].session_id).subscribe(
                        data1 => {
                            console.log(data1);
                            this.bookedStat = data1.bookedStat;
                            this.remainingStat = data1.remainingStat;
                            let data = [{data: [this.bookedStat,this.remainingStat]}];
                            this.pieChartData = data;
                            this.pieChartColor;
                            this.pieChartLabels;
                            this.pieChartOptions;

                        },
                        (err: HttpErrorResponse) => {
                            console.log (err.message);
                        }
                    );
                }else{
                    console.log('data out');
                }
                this.sessionlist = data.session_list;
            },
            (err: HttpErrorResponse) => {
                console.log (err.message);
            }
        );
    }

    /**
     * TO get the data for single session
     * @param Id
     */

    get_session_ticket(Id) {

        this._statisticService.getSingleSessiondata(this.currentEvent,Id).subscribe(
            data1 => {
                 console.log(data1);
                this.bookedStat = data1.bookedStat;
                this.remainingStat = data1.remainingStat;
                let data = [{data: [this.bookedStat,this.remainingStat]}];
                this.pieChartData = data;
                this.pieChartColor;
                this.pieChartLabels;
                this.pieChartOptions;

            },
            (err: HttpErrorResponse) => {
                console.log (err.message);
            }
        );
    }


}
