import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { EventsComponent } from './events/events.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomepageComponent },
    { path: 'tutorials', component: HomepageComponent },
    { path: 'events', component: EventsComponent },
    { path: 'about', component: HomepageComponent },
];
