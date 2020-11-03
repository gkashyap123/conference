import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {StatisticService} from "../../_services/statistics.service";

@Component({
    selector: 'app-static-event-pie-chart',
    templateUrl: './static-event-pie-chart.component.html',
    styleUrls: ['./static-event-pie-chart.component.css']
})
export class StaticEventPieChartComponent implements OnInit {

    public values: any;
    public bookedStat: any;
    public bookedTiket: any;
    public remainTiket: any;
    public currentEvent: any;

    constructor(private _statisticService: StatisticService, private httpService: HttpClient) {
        this.currentEvent = localStorage.getItem('currentEvent');
    }

    pieChartOptions = {
        responsive: true
    }

    pieChartLabels = ['Booked Tickets', 'Remaining Tickets'];

    // CHART COLOR.
    pieChartColor: any = [
        {
            backgroundColor: ['rgba(30, 169, 224, 0.8)',
                'rgba(255,165,0,0.9)',
                'rgba(139, 136, 136, 0.9)',
                'rgba(255, 161, 181, 0.9)',
                'rgba(255, 102, 0, 0.9)'
            ]
        }
    ]

    pieChartData: any = [
        {
            data: []
        }
    ];

    ngOnInit() {
        this.getSessionStateData(this.currentEvent);
    }

    onChartClick(event) {
        console.log(event);
    }

    getSessionStateData(eventId) {
        this._statisticService.getSessionState(eventId).subscribe(
            data1 => {
                this.values = data1.stats;
                if (data1.stats.length !== 0) {
                    this.bookedTiket = (this.values[0].bookTicket || (this.values[0].bookTicket == 'null')) ? this.values[0].bookTicket : 0  ;
                    this.remainTiket = (this.values[0].total_ticket  || (this.values[0].total_ticket == 'null')) ? this.values[0].total_ticket : 0;
                    let data = [{data: [this.bookedTiket, this.remainTiket]}];
                    this.pieChartData = data;
                } else {
                    this.bookedTiket = 0;
                    this.remainTiket = 0;
                    let data = [{data: [this.bookedTiket, this.remainTiket]}];

                }
            },
            (err: HttpErrorResponse) => {
                console.log(err.message);
            }
        );
    }
}
