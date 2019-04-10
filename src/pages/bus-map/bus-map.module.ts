import { BusmapPage } from './bus-map';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';


@NgModule({
  declarations: [
    BusmapPage,
  ],
  imports: [
    IonicPageModule.forChild(BusmapPage),
  ],
})
export class BusMapPageModule {}
