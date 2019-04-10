import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs'; 
export interface bustrack { busno: string,
  DriverName: string,
 Driverphno: string,
  stoppage: Array<Object>,
}
/**
 * Generated class for the AddDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.html',
})
export class AddDataPage {
  
busno;
password;
drivername;
driverno;
statusvalue:boolean;
address;
stopsdataset=[];
busdataset;
stoppage=[];
completedata;
alert;
BusCollection: AngularFirestoreCollection<bustrack>;
busses: Observable<bustrack[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afs: AngularFirestore,public alertCtrl: AlertController) {
  
this.BusCollection = afs.collection<bustrack>('busdb');
this.busses = this.BusCollection.valueChanges();
  }
  presentAlert() 
  {
    this.alert = this.alertCtrl.create({
      title: 'Sorry Admin!',
      subTitle: 'You Must Enter All Field',
      buttons: ['Dismiss']
      });
      this.alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDataPage');
  }
  addstoppage()
  {
    this.stopsdataset.push({stops:'',lat:'',long:''})
  }
  adddata()
  {if(this.busno==null||this.address==null||this.drivername==null||this.driverno==null||this.statusvalue==null)
    {
      this.presentAlert() 
    }
    else{
    this.busdataset={Address:this.address,["Driver Id"]:this.password,["Driver name"]:this.drivername
    ,["Driver no"]:this.driverno,["bus no"]:this.busno,statusvalue:this.statusvalue,stoppage:this.stopsdataset}
    console.log("inside bus dataset",this.busdataset);
    for(let i=0;i<this.busdataset.stoppage.length;i++)
    this.stoppage.push(this.busdataset.stoppage[i].stops,{_lat:this.busdataset.stoppage[i].lat,
      _long:this.busdataset.stoppage[i].long})
    console.log("stoppage list",this.stoppage); 
    this.completedata={Address:this.address,["Driver Id"]:this.password,["Driver name"]:this.drivername
    ,["Driver no"]:this.driverno,["bus no"]:this.busno,statusvalue:this.statusvalue,stoppage:this.stoppage}
    console.log("complete data",this.completedata);
    this.BusCollection.doc(this.busno).set(this.completedata)
  }
    
    
  }
}
