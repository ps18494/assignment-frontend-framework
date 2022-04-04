import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TagsComponent } from './tags/tags.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SongdetailComponent } from './songdetail/songdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    TagsComponent,
    HomeComponent,
    HeaderComponent,
    SongdetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
