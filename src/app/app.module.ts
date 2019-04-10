import { AddDataPage } from './../pages/add-data/add-data';
import { ManagedataPage } from './../pages/managedata/managedata';
import { DatabasePage } from './../pages/database/database';
import { AdminpagePage } from './../pages/adminpage/adminpage';
import { MapPage } from './../pages/map/map';
import { StudentPage } from './../pages/student/student';
import { DriverPage } from './../pages/driver/driver';
import { BusmapPage } from './../pages/bus-map/bus-map';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import firebase from 'firebase';
export const  firebaseConfig = {
  apiKey: "AIzaSyBdBtspii79lb3sI6Fe5hGgyk2SejNbG0g",
    authDomain: "bustracker-244cf.firebaseapp.com",
    databaseURL: "https://bustracker-244cf.firebaseio.com",
    projectId: "bustracker-244cf",
    storageBucket: "bustracker-244cf.appspot.com",
    messagingSenderId: "455884047155"
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,MapPage,StudentPage,DriverPage,BusmapPage,DatabasePage,AdminpagePage,ManagedataPage,AddDataPage
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyChtIus3arMIhw9IROgfuFiWghMaCIwLL4'
      
      // AIzaSyDRZnV4sGOfUtF3o01Wn6i7EY8a97QV7rs
    }),AgmDirectionModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,BusmapPage,DriverPage,StudentPage,MapPage,DatabasePage,AdminpagePage,ManagedataPage,AddDataPage
  ],
  providers: [
    StatusBar,
    SplashScreen,Geolocation,NativeGeocoder,
    AngularFirestore,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
