import {Component, OnInit} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ConferenceService} from '../_services/conference.service';
import {Router} from '@angular/router';
import {IImage} from '../modules/slideshow/iimage';
import * as moment from 'moment';

@Component({
    selector: 'app-conference-preview',
    templateUrl: './conference-preview.component.html',
    styleUrls: ['./conference-preview.component.css']
})
export class ConferencePreviewComponent implements OnInit {
    organizer: any;
    types: any;
    first_name: any;
    start_date_time: any;
    end_date_time: any;
    location_name: any;
    eventType: any;
    eventCategory: any;
    eventImage: any;
    eventImage2: any;
    eventImage3: any;
    eventImage4: any;
    eventImage5: any;


    constructor(private _conferenceService: ConferenceService,
                private conferenceService: ConferenceService,
                private router: Router) {
    }

    ngOnInit() {
        if (!localStorage.getItem('currentEvent')) {
            this.router.navigate(['/my-conference']);
        }

        this.getEventTypeAndCategoryList();
    }

    imageUrls: (string | IImage)[] = [];
    height: string = '174px';
    minHeight: string;
    arrowSize: string = '30px';
    showArrows: boolean = true;
    disableSwiping: boolean = false;
    autoPlay: boolean = false;
    autoPlayInterval: number = 3333;
    stopAutoPlayOnSlide: boolean = true;
    debug: boolean = false;
    backgroundSize: string = 'cover';
    backgroundPosition: string = 'center center';
    backgroundRepeat: string = 'no-repeat';
    showDots: boolean = true;
    dotColor: string = '#FFF';
    showCaptions: boolean = true;
    captionColor: string = '#FFF';
    captionBackground: string = 'rgba(0, 0, 0, .35)';
    lazyLoad: boolean = false;
    hideOnNoSlides: boolean = false;
    width: string = '100%';

    getEventTypeAndCategoryList() {
        this._conferenceService.getEventDetails().subscribe(
            data => {
                this.first_name = data.event.title;
                this.eventImage = data.event.eventImage;
                this.eventImage2 = data.event.eventImage2;
                this.eventImage3 = data.event.eventImage3;
                this.eventImage4 = data.event.eventImage4;
                this.eventImage5 = data.event.eventImage5;
                this.start_date_time = moment(data.event.start_date_time).format('YYYY-MM-DD, h:mm a');
                this.end_date_time = moment(data.event.end_date_time).format('YYYY-MM-DD, h:mm a');
                this.location_name = data.event.location_name;
                this.eventType = data.event.eventType;
                this.eventCategory = data.event.eventCategory;
                if (this.eventImage) {
                    this.imageUrls.push(this.eventImage);
                }
                if(this.eventImage2) {
                    this.imageUrls.push(this.eventImage2);
                }
                if(this.eventImage3) {
                    this.imageUrls.push(this.eventImage3);
                }
                if(this.eventImage4) {
                    this.imageUrls.push(this.eventImage4);
                }
                if(this.eventImage5) {
                    this.imageUrls.push(this.eventImage5);
                }
            }
        );
    }

}
