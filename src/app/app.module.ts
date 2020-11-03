import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Component } from '@angular/core';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
//import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';


import { ChartsModule } from 'ng2-charts';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MyConferenceComponent} from './my-conference/my-conference.component';
import {CreateConferenceComponent} from './create-conference/create-conference.component';
import {EditConferenceComponent} from './edit-conference/edit-conference.component';
import {ConferencePreviewComponent} from './conference-preview/conference-preview.component';

import { ConferenceService } from './_services/conference.service';
import { SessionListComponent } from './session-list/session-list.component';
import { SessionDetailComponent } from './session-detail/session-detail.component';
import { EditSessionComponent } from './edit-session/edit-session.component';
import { SpeakerListComponent } from './speaker-list/speaker-list.component';
import { SpeakerDetailComponent } from './speaker-detail/speaker-detail.component';
import { EditSpeakerComponent } from './edit-speaker/edit-speaker.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { EditVendorComponent } from './edit-vendor/edit-vendor.component';
import { GuestListComponent } from './guest-list/guest-list.component';
import { GuestDetailComponent } from './guest-detail/guest-detail.component';
import { EditGuestComponent } from './edit-guest/edit-guest.component';
import { CreateSessionComponent } from './session-list/create-session/create-session.component';
import { CreateSpeakerComponent } from './create-speaker/create-speaker.component';
import { ShowErrorsComponent } from './errors.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { CreateGuestComponent } from './create-guest/create-guest.component';
import { PricingComponent } from './pricing/pricing.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { RevenueStatisticComponent } from './revenue-statistic/revenue-statistic.component';
import { EventPieChartComponent } from './revenue-statistic/event-pie-chart/event-pie-chart.component';
import { RevenuePieChartComponent } from './revenue-statistic/revenue-pie-chart/revenue-pie-chart.component';
import { StaticEventPieChartComponent } from './statistics/statistic-event-pie-chart/static-event-pie-chart.component';
import { StatisticRevenuePieChartComponent } from './statistics/statistic-revenue-pie-chart/statistic-revenue-pie-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RevenueBarChartComponent } from './revenue-statistic/revenue-bar-chart/revenue-bar-chart.component';
import { SlideshowModule } from './modules/slideshow/slideshow.module';


@NgModule({
    declarations: [
        AppComponent,
        routingComponents,
        LoginComponent,
        SidebarComponent,
        EditProfileComponent,
        HeaderComponent,
        FooterComponent,
        MyConferenceComponent,
        CreateConferenceComponent,
        EditConferenceComponent,
        ConferencePreviewComponent,
        SessionListComponent,
        SessionDetailComponent,
        EditSessionComponent,
        SpeakerListComponent,
        SpeakerDetailComponent,
        EditSpeakerComponent,
        VendorListComponent,
        VendorDetailComponent,
        EditVendorComponent,
        GuestListComponent,
        GuestDetailComponent,
        EditGuestComponent,
        CreateSpeakerComponent,
        ShowErrorsComponent,
        EditGuestComponent,
        CreateGuestComponent,
        CreateSessionComponent,
        StatisticsComponent,
        PricingComponent,
        RevenueStatisticComponent,
        EventPieChartComponent,
        RevenuePieChartComponent,
        StaticEventPieChartComponent,
        StatisticRevenuePieChartComponent,
        RevenueBarChartComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        AngularDateTimePickerModule,
        ReactiveFormsModule,
        ChartsModule,
        BrowserAnimationsModule, // required animations module
        SlideshowModule,

        ToastrModule.forRoot({
          timeOut: 5000,
          positionClass: 'toast-top-center',
          preventDuplicates: false,
          closeButton: true,
          tapToDismiss: true,
          maxOpened: 10
        }),

//        Ng4GeoautocompleteModule.forRoot()
    ],
    providers: [ConferenceService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
