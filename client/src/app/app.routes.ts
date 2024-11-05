import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { ItemsComponent } from './pages/items/items.component';
import { DropComponent } from './pages/drop/drop.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'drop', component: DropComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection vers l'accueil
  { path: '**', redirectTo: '/home' }, // Redirection pour les pages non trouvées
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }