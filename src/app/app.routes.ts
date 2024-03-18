import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { EventsComponent } from './events/events.component';
import { NewEventComponent } from './events/new-event/new-event.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomepageComponent },
    { path: 'tutorials', component: HomepageComponent },
    { path: 'events', component: EventsComponent },
    { path: 'events/new', component: NewEventComponent },
    { path: 'about', component: HomepageComponent },
];
