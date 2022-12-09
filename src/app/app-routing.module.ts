import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JourneysListComponent } from './components/journeys-list/journeys-list.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  { path: 'search', component: SearchComponent },
  { path: 'journeys', component: JourneysListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
