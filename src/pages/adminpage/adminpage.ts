import { AddDataPage } from './../add-data/add-data';
import { DatabasePage } from './../database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { database } from 'firebase';

/**
 * Generated class for the AdminpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adminpage',
  templateUrl: 'adminpage.html',
})
export class AdminpagePage {
username;
password;
status=true;
alert;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminpagePage');
  }
  presentAlert() 
  {
    this.alert = this.alertCtrl.create({
      title: 'OOPS!',
      subTitle: 'You Must Enter Right Username And Password',
      buttons: ['Dismiss']
      });
      this.alert.present();
  }
  verufyadmin()
  {
if(this.username=="admin" && this.password=="admin@123")
{
 this.status=false;;
}
else
this.presentAlert() 
  }
  updatedata()
  {
this.navCtrl.push(DatabasePage)
  }
  addnewdata()
  {
this.navCtrl.push(AddDataPage);
  }
}
