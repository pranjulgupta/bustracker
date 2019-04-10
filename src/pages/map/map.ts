import { AdminpagePage } from './../adminpage/adminpage';
import { DriverPage } from './../driver/driver';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudentPage } from './../student/student';


/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }
studentpage()
{
  this.navCtrl.push(StudentPage);
}
driverpage()
{
  this.navCtrl.push(DriverPage);
}
adminpage()
{
  this.navCtrl.push(AdminpagePage)
}
}
