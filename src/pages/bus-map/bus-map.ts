import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BusmapPage page.
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
  selector: 'page-bus-map',
  templateUrl: 'bus-map.html',
})
export class BusmapPage {
busno;
status1;
currentlat;
currentlng;
pos;
BusCollection: AngularFirestoreCollection<bustrack>;
busses: Observable<bustrack[]>;
placelist=[];

listofplace
  constructor(public geo: Geolocation,public navCtrl: NavController, public navParams: NavParams,public afs: AngularFirestore) {
     
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
  this.busno=this.navParams.get('Busno');
  this.status1=this.navParams.get('status1');
//this.placelist=this.navParams.get('placelist');
  console.log("busmap page",this.busno,this.placelist);
 
  this.BusCollection.ref.where("bus no", "==", this.busno).get()
.then((querySnapshot)=>
{
  querySnapshot.forEach((doc)=>{
    console.log(doc.data());
    this.listofplace=doc.data();

    for(var i=0;i<doc.data()["stoppage"].length;i++)
    {
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
  
  }

  ionViewDidLoad() {
    let that=this;
    console.log('ionViewDidLoad BusmapPage');
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
             that.pos = {
            // lat:26.2389,
            // lng:73.0243
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
        
            console.log("current lat,long2",that.pos);
         that.currentlat=that.pos.lat;
         that.currentlng=that.pos.lng
          console.log("inside",that.currentlat);
          
          }, function() {

            });
          }
  }
  ionViewWillLeave()
  { console.log("before leave page",this.placelist);
    this.placelist=null;
    console.log("after leave page",this.placelist);
  
  }
trackBus()
{
console.log("trackbus",this.currentlat);

  let BusNo={busno:this.busno,status1:this.status1,currentlat:this.currentlat,currentlng:this.currentlng};
  this.navCtrl.push(HomePage
    ,BusNo)
}
}
