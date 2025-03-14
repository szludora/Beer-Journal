import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AddComponent } from './components/add/add.component';
import { BeerComponent } from './components/beer/beer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddComponent },
  { path: 'beer/:id', component: BeerComponent },
];
