import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//Firebase
import {firebaseConfig} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
//Forms
import {FormsModule} from '@angular/forms';
//Componentes
import {SmsComponent} from './pages/sms/sms.component';
//FCM
import { FCM } from '@ionic-native/fcm/ngx';
//HTTP
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent, SmsComponent],
  entryComponents: [AppComponent, SmsComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  AngularFireModule.initializeApp(firebaseConfig),
AngularFireAuthModule,
AngularFirestoreModule,
AngularFireStorageModule,
FormsModule,
HttpClientModule
],
  providers: [
    FCM,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
