import { Component, OnInit } from '@angular/core';
import {StatisticService} from '../../_services/statistics.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import * as moment from 'moment';

@Component({
    selector: 'app-event-pie-chart',
    templateUrl: './event-pie-chart.component.html',
    styleUrls: ['./event-pie-chart.component.css']
})

export class EventPieChartComponent implements OnInit {
    public values: any;
    public labels:any;
    public bookedStat: any;
    public bookedTiket: any;
    public remainTiket: '';
    public currentEvent: any;

    constructor(private _statisticService: StatisticService,private httpService: HttpClient) {
        this.currentEvent = localStorage.getItem('currentEvent');

    }

    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    stepSize: 1
                }
            }]
        }
    };

    public barChartLabels:string[] = [];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    //public barChartData:any[] = [];
    public barChartData:any[] = [{data: [], label: 'Booked Tickets'}];

    ngOnInit() {
        this.getSessionStateData(this.currentEvent);
    }

    onChartClick(event) {
        console.log(event);
    }

    getSessionStateData(eventId) {

        if (localStorage.currentEventBookingStartDate && localStorage.currentEventBookingStartDate !== 'undefined') {

            let chartType = this._statisticService.getDifferenceTwoDates(localStorage.currentEventBookingStartDate);

            this._statisticService.getRevenuSessionState(chartType, eventId).subscribe(
                data1 => {
                    if (data1.revenueStats) {
                        switch (chartType) {
                            case "day":
                                for (let val of data1.revenueStats) {
                                    if (this.barChartData[0].data.length == 0) {
                                        let data = [{data: [val.totalBookedTickets]}];
                                        this.barChartData = data;
                                    } else {
                                        this.barChartData[0].data.push(val.totalBookedTickets);
                                    }
                                    let dayName = moment(val.date.year + '-' + val.date.month + '-' + val.date.day, 'YYYY-MM-DD').format('Do MMM  YY');
                                    this.barChartLabels.push(dayName);
                                }
                                break;
                            case "week":
                                for (let val of data1.revenueStats) {
                                    if (this.barChartData[0].data.length == 0) {
                                        let data = [{data: [val.totalBookedTickets]}];
                                        this.barChartData = data;
                                    } else {
                                        this.barChartData[0].data.push(val.totalBookedTickets);
                                    }
                                    this.barChartLabels.push(val.week.week + 'th week ' + val.week.year);
                                }
                                break;
                            case "month":
                                for (let val of data1.revenueStats) {
                                    if (this.barChartData[0].data.length == 0) {
                                        let data = [{data: [val.totalBookedTickets]}];
                                        this.barChartData = data;
                                    } else {
                                        this.barChartData[0].data.push(val.totalBookedTickets);
                                    }
                                    this.barChartLabels.push(val.month.month + 'th month ' + val.month.year);
                                }
                                break;
                            case "year":
                                for (let val of data1.revenueStats) {
                                    if (this.barChartData[0].data.length == 0) {
                                        let data = [{data: [val.totalBookedTickets]}];
                                        this.barChartData = data;
                                    } else {
                                        this.barChartData[0].data.push(val.totalBookedTickets);
                                    }
                                    this.barChartLabels.push(val.year.year);
                                }
                                break;
                        }
                    } else {
                        /*let data = [{data: [0, 0]}];
                        this.barChartData = data;
                        console.log(this.pieChartData);*/
                    }
                },
                (err: HttpErrorResponse) => {
                    console.log('error' + err.message);
                }
            );
        } else {
            console.log("Event Booking date is not defined");
        }
    }
}

