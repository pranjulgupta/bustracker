import { ManagedataPage } from './../managedata/managedata';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the DatabasePage page.
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
  selector: 'page-database',
  templateUrl: 'database.html',
})
export class DatabasePage {
  busdataset=[];
  anotherbusdataset=[];
  anotherbusdataset1=[];
  buslist=[];
  places1=Array;
  placelistmarker=[];
  places=[];
  lattitude;
  longitude;
listofstoppage=[]
  BusCollection: AngularFirestoreCollection<bustrack>;
  busses: Observable<bustrack[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afs: AngularFirestore) {
    this.BusCollection = afs.collection<bustrack>('busdb');
    this.busses = this.BusCollection.valueChanges();
  this.BusCollection.ref
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
     
       console.log(doc.data())
     this.busdataset.push(doc.data())
     this.anotherbusdataset.push(doc.data())
     for(var i=0;i<doc.data()["stoppage"].length;i+=2)
{
let places1 ={
  stops: doc.data()["stoppage"][i],
  lat: doc.data()["stoppage"][i+1]._lat,
  long: doc.data()["stoppage"][i+1]._long
}
this.placelistmarker.push(places1)

}
this.buslist.push({DriverId:doc.data()["Driver Id"],DriverName:doc.data()["Driver name"],Driverno:doc.data()["Driver no"],
busno:doc.data()["bus no"],statusvalue:doc.data()["statusvalue"],address:doc.data()["Address"],stoppage:this.placelistmarker

})
this.anotherbusdataset1=this.buslist
console.log("inside buslist",this.buslist);

// this.listofstoppage.push(this.placelistmarker)
this.listofstoppage.push(this.buslist)
console.log("list of data",this.listofstoppage)
this.placelistmarker = []

    })
  }).catch(function(error) {
    console.log("Error getting documents: ", error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatabasePage');
  }
updatedata(index1,index2)
{
  console.log("inside bus data",this.buslist[index1]);
  console.log("stoppage",this.buslist[index1]["stoppage"]);
  
let busobj={
  index1:index1,
  index2:index2,
  busdataset:this.buslist[index1],
stopsdataset:this.buslist[index1]["stoppage"]
}
this.navCtrl.push(ManagedataPage,busobj)
}
getItems(ev: any) {
  console.log("inside search");
  console.log("inside search ",this.anotherbusdataset1);
 const val = ev.target.value;

 if (val && val.trim() != '') {

   this.buslist = this.anotherbusdataset1.filter((searchArray) => {
     return (searchArray.busno.toLowerCase().indexOf(val.toLowerCase()) > -1);
   })
   
 }
console.log("inside search ",this.anotherbusdataset1);

 
}

}
