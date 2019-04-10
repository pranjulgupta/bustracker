import { HomePage } from './../home/home';
import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DriverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs'; 
export interface bustrack { busno: string,
  DriverName: string,
 Driverphno: string,
  stoppage: Array<Object>,
}
@IonicPage()
@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html',
})

export class DriverPage {
  busno;
  
  password;
  Idnumber;
  BusCollection: AngularFirestoreCollection<bustrack>;
busses: Observable<bustrack[]>;
  alert;
  status=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public afs: AngularFirestore) {
    this.BusCollection = afs.collection<bustrack>('busdb');
    this.busses = this.BusCollection.valueChanges();
    this.BusCollection.ref
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
     
       console.log(doc.data())
  })
}).catch(function(error) {
  console.log("Error getting documents: ", error);
  });
}
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverPage');
  }
  presentAlert() 
  {
    this.alert = this.alertCtrl.create({
      title: 'OOPS!',
      subTitle: 'You Must Enter Right Busno. And Password',
      buttons: ['Dismiss']
      });
      this.alert.present();
  }

  trackbus()
  {this.BusCollection.ref.where("bus no", "==", this.busno).get()
  .then((querySnapshot)=>
  {
    querySnapshot.forEach((doc)=>{
      console.log(doc.data());
      this.Idnumber=doc.data()["Driver Id"];
      if(this.busno==null||this.password==null||this.password!=this.Idnumber)
      this.presentAlert() 
      else{
        this.status=true;
        let BusNo={busno:this.busno,status:this.status};
        this.navCtrl.push(HomePage
          ,BusNo)
      }
  })
}).catch(function(error){
  console.log("Error getting documents: ", error);
});
    
   
 }
}
