import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AddComponent } from './components/add/add.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'page2', component: AddComponent },
];
