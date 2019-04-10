import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs'; 
export interface bustrack { busno: string,
  DriverName: string,
 Driverphno: string,
  stoppage: Array<Object>,
}
/**
 * Generated class for the ManagedataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-managedata',
  templateUrl: 'managedata.html',
})
export class ManagedataPage {
index1;
index2;
busdataset;
stopsdataset=[];
num=0;
busdata:any={};
busno;
stopdata=[];
drivername;
driverno;
Addr;
password;
statusvalue;
BusCollection: AngularFirestoreCollection<bustrack>;
busses: Observable<bustrack[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afs: AngularFirestore) {
this.busdataset=this.navParams.get("busdataset");
this.stopsdataset=this.navParams.get("stopsdataset");
this.index1=this.busdataset["index1"];
this.busno=this.busdataset["busno"];
this.drivername=this.busdataset["DriverName"];

this.password=this.busdataset["DriverId"];
this.driverno=this.busdataset["Driverno"];
this.statusvalue=this.busdataset["statusvalue"];
console.log("bus data",this.busdataset);
console.log("bus no",this.busno);
console.log("stops data",this.stopsdataset);

this.BusCollection = afs.collection<bustrack>('busdb');
this.busses = this.BusCollection.valueChanges();
this.BusCollection.ref
.get()
.then((querySnapshot) => {
querySnapshot.forEach((doc) => {
 
   console.log(doc.data())
 //  this.busdata.push(doc.data())
})
}).catch(function(error) {
console.log("Error getting documents: ", error);
});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagedataPage');
  }
updatedata()
{
  this.BusCollection.ref.where("bus no","==", this.busno)
    .get()
    .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      this.busdata=doc.data();
      console.log("bus data",this.busdata);
      this.busdata["Driver Id"]=this.password;
      this.busdata["Driver name"]=this.drivername;
      this.busdata["Driver no"]=this.driverno;
      this.busdata["statusvalue"]=this.statusvalue;
//this.busdata["stoppage"]=this.stopsdataset;
// for(var i=0;i<doc.data()["stoppage"].length;i++)
// {

//   if(i%2==0){
//   this.busdata[i]=this.stopsdataset[i].stops;
//   console.log("stopaage",this.stopsdataset[i].stops);  
// }
//   if(i%2!=0){
//     console.log("coordinate",this.busdata[i]._lat,this.stopsdataset[i].lat, this.busdata[i]._long,this.stopsdataset[i].long);
    
//   this.busdata[i]._lat=this.stopsdataset[i].lat;
//   this.busdata[i]._long=this.stopsdataset[i].long;
// }}
console.log("length",this.stopsdataset.length,doc.data()["stoppage"].length);

for(var i=0;i<this.stopsdataset.length;i++)
{
  console.log("inside for loop",this.num,this.stopsdataset[i].stops,this.stopsdataset[i].lat,this.stopsdataset[i].long);
// this.stopdata[this.num++]=this.stopsdataset[i].stops;
// this.stopdata[this.num]=this.stopsdataset[i].lat;
// this.stopdata[this.num++]=this.stopsdataset[i].long;
 this.stopdata.push(this.stopsdataset[i].stops,{lat:this.stopsdataset[i].lat,long:this.stopsdataset[i].long})
// console.log("inside for loop1",this.stopdata,this.num);


}
for(var i=0;i<doc.data()["stoppage"].length;i+=2)
{

  this.busdata.stoppage[i]=this.stopdata[i];
  // console.log("stopaage",this.stopsdataset[i].stops);  

  //   console.log("coordinate",this.busdata[i]._lat,this.stopsdataset[i].lat, this.busdata[i]._long,this.stopsdataset[i].long);
    
  this.busdata.stoppage[i+1]._lat=this.stopdata[i+1].lat;
  this.busdata.stoppage[i+1]._long=this.stopdata[i+1].long;
}
console.log("inside for loop1",this.stopdata,this.num);

console.log("inside update",this.stopsdataset);

      console.log(this.busdata);
    //  console.log("inside update",this.busdata["stoppage"]);
      
      this.BusCollection.doc(this.busno).update(this.busdata)
    })
  }).catch(function(error) {
    console.log("Error getting documents: ", error);
    });
    
}


}
