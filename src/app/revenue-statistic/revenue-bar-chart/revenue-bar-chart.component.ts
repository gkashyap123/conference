import { Component, OnInit } from '@angular/core';
import {StatisticService} from '../../_services/statistics.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-revenue-bar-chart',
  templateUrl: './revenue-bar-chart.component.html',
  styleUrls: ['./revenue-bar-chart.component.css']
})

export class RevenueBarChartComponent implements OnInit {
    public values: any;
    public bookedStat: any;
    public bookedTiket: any;
    public remainTiket: '';
    public currentEvent: any;

    constructor(private _statisticService: StatisticService,private httpService: HttpClient) {
        this.bookedTiket = 32;
        this.currentEvent = localStorage.getItem('currentEvent');

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
                //console.log(data);
                this.values = data1;
                this.bookedTiket = this.values.bookedStat;
                this.remainTiket = this.values.remainingStat;
                let data = [{data: [this.bookedTiket,this.remainTiket]}];
                this.pieChartData = data;
                console.log(this.pieChartData);
            },
            (err: HttpErrorResponse) => {
                console.log (err.message);
            }
        );
    }
}
