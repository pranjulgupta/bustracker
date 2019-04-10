import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagedataPage } from './managedata';

@NgModule({
  declarations: [
    ManagedataPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagedataPage),
  ],
})
export class ManagedataPageModule {}
