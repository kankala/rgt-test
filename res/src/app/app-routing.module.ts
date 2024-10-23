import { NgModule } from '@angular/core';
import { Routes,RouterModule,} from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ArtworkComponent } from './index/artwork/artwork.component';
import { HistoryComponent } from './index/history/history.component';
import { MainComponent } from './index/main/main.component';
import { ContactComponent } from './index/contact/contact.component';

const routes: Routes = [
	{ path: '', redirectTo: 'index', pathMatch: 'full' },
	{
		path: 'index',
		component: IndexComponent,
		//canActivate: [AuthGuard],
		data: { title: 'index', subtitle: '' },
		children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainComponent, data: { title: '메인' } },
      { path: 'artwork', component: ArtworkComponent, data: { title: '아트워크' } },
      { path: 'history', component: HistoryComponent, data: { title: '히스토리' } },
      { path: 'contact', component: ContactComponent, data: { title: '연락처' } },
    ]
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true }),],
  exports: [RouterModule,]
})
export class AppRoutingModule { }
