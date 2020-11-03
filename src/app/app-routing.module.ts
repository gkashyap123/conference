import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

import {DepartmentListComponent} from './department-list/department-list.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {LoginComponent} from './login/login.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {MyConferenceComponent} from './my-conference/my-conference.component';
import {CreateConferenceComponent} from './create-conference/create-conference.component';
import {EditConferenceComponent} from './edit-conference/edit-conference.component';
import {ConferencePreviewComponent} from './conference-preview/conference-preview.component';
import {SessionListComponent} from './session-list/session-list.component';
import {SessionDetailComponent} from './session-detail/session-detail.component';
import {EditSessionComponent} from './edit-session/edit-session.component';
import {SpeakerListComponent} from './speaker-list/speaker-list.component';
import {SpeakerDetailComponent} from './speaker-detail/speaker-detail.component';
import {EditSpeakerComponent} from './edit-speaker/edit-speaker.component';
import {CreateSpeakerComponent} from './create-speaker/create-speaker.component';
import {VendorListComponent} from './vendor-list/vendor-list.component';
import {VendorDetailComponent} from './vendor-detail/vendor-detail.component';
import {EditVendorComponent} from './edit-vendor/edit-vendor.component';
import {GuestListComponent} from './guest-list/guest-list.component';
import {GuestDetailComponent} from './guest-detail/guest-detail.component';
import {EditGuestComponent} from './edit-guest/edit-guest.component';
import {CreateGuestComponent} from './create-guest/create-guest.component';
import {CreateSessionComponent} from './session-list/create-session/create-session.component';
import { PricingComponent } from './pricing/pricing.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {RevenueStatisticComponent} from './revenue-statistic/revenue-statistic.component';


const routes: Routes = [

  {path: 'edit-profile', component: EditProfileComponent , canActivate: [AuthGuard]},
  {path: 'departments', component: DepartmentListComponent, canActivate: [AuthGuard]},
  {path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'my-conference', component: MyConferenceComponent, canActivate: [AuthGuard]},
  {path: 'create-conference', component: CreateConferenceComponent, canActivate: [AuthGuard]},
  {path: 'create-session', component: CreateSessionComponent, canActivate: [AuthGuard]},
  {path: 'edit-conference', component: EditConferenceComponent, canActivate: [AuthGuard]},
  {path: 'edit-conference/:id', component: EditConferenceComponent, canActivate: [AuthGuard]},
  {path: 'conference-preview', component: ConferencePreviewComponent, canActivate: [AuthGuard]},
  {path: 'session-list', component: SessionListComponent, canActivate: [AuthGuard]},
  {path: 'session-detail/:id', component: SessionDetailComponent, canActivate: [AuthGuard]},
  {path: 'edit-session/:id', component: EditSessionComponent, canActivate: [AuthGuard]},
  {path: 'speaker-list', component: SpeakerListComponent, canActivate: [AuthGuard]},
  {path: 'speaker-detail', component: SpeakerDetailComponent, canActivate: [AuthGuard]},
  {path: 'create-speaker', component: CreateSpeakerComponent, canActivate: [AuthGuard]},
  {path: 'edit-speaker/:id', component: EditSpeakerComponent, canActivate: [AuthGuard]},
  {path: 'vendor-list', component: VendorListComponent, canActivate: [AuthGuard]},
  {path: 'vendor-detail', component: VendorDetailComponent, canActivate: [AuthGuard]},
  {path: 'edit-vendor', component: EditVendorComponent, canActivate: [AuthGuard]},
  {path: 'guest-list', component: GuestListComponent, canActivate: [AuthGuard]},
  {path: 'guest-detail/:id', component: GuestDetailComponent, canActivate: [AuthGuard]},
  {path: 'edit-guest/:id', component: EditGuestComponent, canActivate: [AuthGuard]},
  {path: 'create-guest', component: CreateGuestComponent, canActivate: [AuthGuard]},
  {path: 'pricing', component: PricingComponent, canActivate: [AuthGuard]},
  {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},
  {path: 'revenue-statistics', component: RevenueStatisticComponent, canActivate: [AuthGuard]},

    // otherwise redirect to conference list.
    { path: '**', redirectTo: 'my-conference' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
export const routingComponents = [
  DepartmentListComponent,
  EmployeeListComponent
];
