import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms'; //양방향
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';


import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { MainComponent } from './index/main/main.component';
import { HistoryComponent } from './index/history/history.component';
import { ArtworkComponent } from './index/artwork/artwork.component';
import { ContactComponent } from './index/contact/contact.component';


import { NavbarComponent } from './index/navbar/navbar.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { HttpApiService } from './common/service/http-api.service';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './index/main/dialog/detail/detail.component';
import { AddComponent } from './index/main/dialog/add/add.component';
import { InputpatternPipe } from './common/pipe/inputpattern.pipe';




@NgModule({
  declarations: [
    IndexComponent,
    AppComponent,
    MainComponent,
    HistoryComponent,
    ArtworkComponent,
    NavbarComponent,
    ContactComponent,
    DetailComponent,
    AddComponent,
    InputpatternPipe,
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    NgxPaginationModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [HttpApiService,{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
