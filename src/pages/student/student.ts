import { BusmapPage } from './../bus-map/bus-map';
import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StudentPage page.
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
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {
Busno;
alert;
placelist=[];
l;
list=[];
listofplace:any={};
BusCollection: AngularFirestoreCollection<bustrack>;
busses: Observable<bustrack[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afs: AngularFirestore,public alertCtrl: AlertController) {
   
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
    
    console.log('ionViewDidLoad StudentPage');
  }
  presentAlert() 
  {
    this.alert = this.alertCtrl.create({
      title: 'OOPS!',
      subTitle: 'You Must Enter Busno.',
      buttons: ['Dismiss']
      });
      this.alert.present();
  }
bustrack()
{if(this.Busno==null)
  {
    this.presentAlert()
  }
  else{
this.BusCollection.ref.where("bus no", "==", this.Busno).get()
.then((querySnapshot)=>
{
  querySnapshot.forEach((doc)=>{
    console.log(doc.data());
    this.listofplace=doc.data();

    for(var i=0;i<doc.data()["stoppage"].length;i++)
    {this.l=doc.data()["stoppage"].length;
      if(i%2==0)
      {this.placelist.push({stops:doc.data()["stoppage"][i]})
    //this.listofplace=doc.data()["stoppage"][i]
    
    }
      else
      continue;
    }
    
  })
}).catch(function(error){
  console.log("Error getting documents: ", error);
});
for(let i=0;i<this.l;i++)
{
  this.list.push({stops:this.listofplace.stoppage})
}
console.log("list of place",this.list);

let busesno={Busno:this.Busno,placelist:this.placelist,status1:true};
console.log("busses details",busesno,this.Busno);
  this.navCtrl.push(BusmapPage,busesno)

}}
}
