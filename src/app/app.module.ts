import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {IpService} from './services/ip.service';
import {FirebaseService} from './services/firebase.service';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from './material/material.module';
import {CatalogComponent} from './catalog/catalog.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'angularfs'),
    AngularFirestoreModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [
    IpService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
