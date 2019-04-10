
import { Component } from '@angular/core';
import { NavController,LoadingController,NavParams } from 'ionic-angular';
import { MouseEvent } from '@agm/core';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs'; 
declare var google;
export interface bustrack { busno: string,
  DriverName: string,
 Driverphno: string,
  stoppage: Array<Object>,
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  statusValue;
  busdata=[];
  disable4;
  disable5;
  responseObj:any;
  watchLocationUpdates:any; 
  loading:any;
  isWatching:boolean;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5};
busno;
searchbus;
Addr;
drivername;
newAddr;
disable;
disable1;
disable2;
newlat1;
newlong2;
dir=undefined;
disable3;
driverno;
status=false;
newlat;
busdataset:any={};
busdatabase=[];
newlong;
stops;
time;
num;
status1;
stoppage=[];
lattitude=[];
longitude=[];
markers=[];
label;
draggable;
places=[];
list=false;
locationmarker_lat;
locationmarker_long;
locationmarker_lat1;
MyLocation: any;
currentlat;
currentlng;
locationmarker_long1;
placelist=[];
placelistmarker=[];
  BusCollection: AngularFirestoreCollection<bustrack>;
  busses: Observable<bustrack[]>;
  constructor(public geo: Geolocation,public navParams:NavParams, public navCtrl: NavController,public afs: AngularFirestore,public loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) {
      this.responseObj = {
        latitude:0,
        longitude:0,
        accuracy:0,
        address:""
      };
this.searchbus=this.navParams.get('busno');
this.currentlat=this.navParams.get('currentlat');
this.currentlng=this.navParams.get('currentlng')
this.status=this.navParams.get('status');
if(this.status==true)
this.status=this.status;
else
this.status=false;
this.status1=this.navParams.get('status1');
if(this.status1==true)
this.status1=this.status1;
else
this.status1=false;
console.log("search",this.searchbus,this.status,this.status1);

    this.BusCollection = afs.collection<bustrack>('busdb');
    this.busses = this.BusCollection.valueChanges();
  this.BusCollection.ref
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
     
       console.log(doc.data())
       
       console.log(doc.data()["bus no"]);
       
       this.busno=doc.data()["bus no"];
       console.log(this.busno+"jh");
       
       this.stoppage.push(doc.data()["stoppage"]);
this.busdata.push(doc.data())
       
    })
  }).catch(function(error) {
    console.log("Error getting documents: ", error);
    });
    console.log("new data");
    this.BusCollection.ref.where("bus no","==", this.searchbus)
    .get()
    .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      this.busdataset=doc.data();
    console.log(doc.data()["stoppage"][0]._lat);
    console.log("driver detail",doc.data()["Driver no"],doc.data()["Driver name"]);
    this.statusValue=doc.data()["statusvalue"];
    this.driverno=doc.data()["Driver no"];
    this.drivername=doc.data()["Driver name"];
    this.Addr=doc.data()["Address"];
    console.log("driver information",this.drivername,this.driverno,this.statusValue );
    
for(var i=0;i<doc.data()["stoppage"].length;i++)
{this.places.push(doc.data()["stoppage"][i]);
if(i%2==0)
{
  this.placelistmarker.push({stops:doc.data()["stoppage"][i]})
}
if(i%2!=0)
{
  this.placelistmarker.push({lat:doc.data()["stoppage"][i]._lat,long:doc.data()["stoppage"][i]._long})


  //console.log(doc.data()["stoppage"][i]._lat);
  this.lattitude.push(doc.data()["stoppage"][i]._lat);
  this.longitude.push(doc.data()["stoppage"][i]._long);
  
}

console.log("placemarkr",this.placelistmarker);  
console.log("hello",this.lattitude.length,this.longitude.length);
this.num=this.lattitude.length;
}
   
  });
  
  })
  .catch(function(error) {
  console.log("Error getting documents: ", error);
  });
console.log(this.busdata);
console.log(this.stoppage);
console.log("places list",this.places);

console.log("data from firebase");
console.log(this.busno);

for(var i=0;i<=this.stoppage.length;i++)
{
console.log(this.stoppage[i]);

}

}
TrackGeolocation()
 {
//   this.geo.getCurrentPosition().then( (pos )=> {
//     this.currentlat = pos.coords.latitude;
//     this.currentlng = pos.coords.longitude;
//   }).catch( err => console.log(err));
  
   
   console.log("inside track");
 console.log("current lat,long",this.currentlat,this.currentlng);
  

  this.disable5=true;
  for(var i=0;i<this.lattitude.length;i++)
{
  
    
  
this.markers.push({ lat: this.lattitude[i],
      lng: this.longitude[i],
      label: 'A'+i,
      draggable: false,
      iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"})
  console.log(this.lattitude[i]);
  console.log(this.longitude[i]);
  // this.locationmarker_lat=this.lattitude[this.lattitude.length-1];
  // this.locationmarker_long=this.longitude[this.longitude.length-1];
  // this.locationmarker_lat1=this.lattitude[this.lattitude.length-1];
  // this.locationmarker_long1=this.longitude[this.longitude.length-1];

  // this.locationmarker_lat=this.responseObj.lattitude;
  // this.locationmarker_long=this.responseObj.longitude;
  console.log( "yellow markr",this.responseObj.latitude,this.responseObj.longitude);
  
  console.log("numlength",this.num);
  
  if(this.num==i+1)
  {this.markers[i].iconUrl="https://maps.google.com/mapfiles/kml/shapes/bus.png";
  this.markers[0].iconUrl="https://maps.google.com/mapfiles/kml/shapes/man.png";
 
  console.log("url");
 
      // this.time=setTimeout(()=>{
      //   this.markarposition(i);
      // },1000);
      // setTimeout(() => {
      //   this.markarposition(i);
      // }, 1000);
      this.markarposition(i);   
}

}
}
markarposition(i)
{ 
  
  this.markers[0].lat=this.currentlat;
  this.markers[0].lng=this.currentlng;
  this.dir = {
    origin: { lat: this.markers[0].lat, lng:this.markers[0].lng },
    destination: { lat: this.markers[i].lat, lng: this.markers[i].lng }
  }

  console.log("inside currentlnd",this.dir);
  
    console.log("inside markr position if numlength",this.num);
    console.log("iconUrl",this.markers[i].lat, this.markers[i].lng);
  this.BusCollection.ref.where("bus no","==", this.searchbus)
  .get()
  .then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
     this.busdataset=doc.data();
     this.newAddr=this.busdataset.Address
   this.markers[i].lat=this.busdataset.stoppage[this.placelistmarker.length-1]._lat
    this.markers[i].lng=this.busdataset.stoppage[this.placelistmarker.length-1]._long;
    // this.newlat1=doc.data()["stoppage"][length-1]._lat;
    // this.newlong2=doc.data()["stoppage"][length-1]._long;
    console.log("length",this.busdataset.stoppage[this.placelistmarker.length-1]._lat);
 // console.log(doc.data()["stoppage"][length-1]._lat);
 console.log("data",this.markers[i].lat,this.markers[i].lng);
 
  console.log("data from firebase2 ",this.newlat1,this.newlong2);
});
  
})
.catch(function(error) {
console.log("Error getting documents: ", error);
});
  
  // this.markers[i].lat=this.responseObj.latitude;
  // this.markers[i].lng=this.responseObj.longitude;
  // this.locationmarker_lat=this.responseObj.latitude;
  // this.locationmarker_long=this.responseObj.longitude;
  this.markers[i].lat=this.newlat1;
  this.markers[i].lng=this.newlong2;
console.log("iconUrl",this.markers[i].lat, this.markers[i].lng);
setTimeout(()=>{this.markarposition(i);
},1000)}
  
 function1()
{ 
  // this.markers[this.lattitude.length-1].lat=this.responseObj.latitude;
  // this.markers[this.lattitude.length-1].long=this.responseObj.longitude;
  console.log("hello data",this.busdataset.stoppage[this.placelistmarker.length-1]._lat, this.busdataset.stoppage[this.placelistmarker.length-1]._long);
  
  this.disable1=true;
  console.log("bus no",this.searchbus)
console.log("update bus data set",this.busdataset);
  this.busdataset.statusvalue=true;
  this.busdataset.stoppage[this.placelistmarker.length-1]._lat=this.responseObj.latitude;
  this.busdataset.stoppage[this.placelistmarker.length-1]._long=this.responseObj.longitude;
  
   this.BusCollection.doc(this.searchbus).update(this.busdataset)
   this.statusValue=this.busdataset.statusvalue;
   console.log("update bus data set",this.busdataset,this.statusValue);
   console.log("hello after data",this.busdataset.stoppage[this.placelistmarker.length-1]._lat, this.busdataset.stoppage[this.placelistmarker.length-1]._long);

   console.log("place length",this.placelistmarker.length);
   console.log("lattitudelength",this.lattitude,"longitude length",this.longitude,"new length",this.lattitude[this.lattitude.length-1]);
   
   for(var i=0;i<=this.placelistmarker.length;i++)
   {
    
    //console.log(this.placelistmarker);
    
   }
  this.list=!this.list;
for(var i=0;i<this.lattitude.length;i++)
{

this.markers.push({ lat: this.lattitude[i],
      lng: this.longitude[i],
      label: 'A'+i,
      draggable: false,
      iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"})
  console.log(this.lattitude[i]);
  console.log(this.longitude[i]);
  // this.locationmarker_lat=this.lattitude[this.lattitude.length-1];
  // this.locationmarker_long=this.longitude[this.longitude.length-1];
  // this.locationmarker_lat1=this.lattitude[this.lattitude.length-1];
  // this.locationmarker_long1=this.longitude[this.longitude.length-1];

  // this.locationmarker_lat=this.responseObj.lattitude;
  // this.locationmarker_long=this.responseObj.longitude;
  console.log( "yellow markr",this.responseObj.latitude,this.responseObj.longitude);
  
  console.log("numlength",this.num);
  if(this.num==i+1)
  {console.log(" if numlength",this.num);
  this.markers[i].lat=this.responseObj.latitude;
  this.markers[i].lng=this.responseObj.longitude;
  this.locationmarker_lat=this.responseObj.latitude;
  this.locationmarker_long=this.responseObj.longitude;
this.markers[i].iconUrl="https://maps.google.com/mapfiles/kml/shapes/bus.png";
console.log("iconUrl",this.markers[i].iconUrl,this.markers[i].lat, this.markers[i].lng, this.locationmarker_lat,this.locationmarker_long);

  }

}
// this.showLoader();
// this.geolocation.getCurrentPosition().then((resp) => {
//   this.responseObj = resp.coords; 
//   this.hideLoader();
//   this.getGeoencoder(this.responseObj.latitude,this.responseObj.longitude);
//  }).catch((error) => {
//    alert('Error getting location'+ JSON.stringify(error));
//    this.hideLoader();
//  });
console.log("locationmarkr",this.locationmarker_lat,this.locationmarker_long);

console.log("markr length",this.markers);

console.log("after");
console.log(this.places.length);

for(var i=0;i<this.places.length;i++)
{
if(i%2!=0)
{
continue;
}
else{
  console.log(this.places[i]);
  this.placelist.push(this.places[i]);
}
}
console.log("after for loop");
console.log(this.placelist);

 }

 showLoader(){
  if(!this.loading){
  this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  this.loading.present();}
}
hideLoader(){
  if(this.loading){
  this.loading.dismiss();
  this.loading = null;
}}
getGeolocation(){
  this.disable=true;
  this.showLoader();
  this.geolocation.getCurrentPosition().then((resp) => {
    this.responseObj = resp.coords; 
    this.hideLoader();
    this.getGeoencoder(this.responseObj.latitude,this.responseObj.longitude);
   }).catch((error) => {
     alert('Error getting location'+ JSON.stringify(error));
     this.hideLoader();
   });
}
getGeoencoder(latitude,longitude){
  this.showLoader();
  this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
  .then((result: NativeGeocoderReverseResult[]) => {
    this.responseObj.address = this.generateAddress(result[0]);
    this.hideLoader();
  })
  .catch((error: any) => {
    alert('Error getting location'+ JSON.stringify(error));
    this.hideLoader();
  });
}
generateAddress(addressObj){
  let obj = [];
  let address = "";
  for (let key in addressObj) {
    obj.push(addressObj[key]);
  }
  obj.reverse();
  for (let val in obj) {
    if(obj[val].length)
    address += obj[val]+', ';
  }
return address.slice(0, -2);
}
watchLocation(){
  this.disable2=true;
  this.showLoader();
  this.isWatching = true;
  this.watchLocationUpdates = this.geolocation.watchPosition();
  this.watchLocationUpdates.subscribe((resp) => {
    //alert(JSON.stringify(resp));
    this.hideLoader();
    this.responseObj = resp.coords;
    this.getGeoencoder(this.responseObj.latitude,this.responseObj.longitude);
    // resp can be a set of coordinates, or an error (if an error occurred).
    // resp.coords.latitude
    // resp.coords.longitude
  });
}

//Stop location update watch
stopLocationWatch(){
  this.isWatching = false;
  this.watchLocationUpdates.unsubscribe();
}

zoom: number = 8;
  
    // initial center position for the map
    lat: number = 26.82160;
    lng: number = 75.85637;
  
    clickedMarker(label: string, index: number) {
      console.log(`clicked the marker: ${label || index}`)
    }
    
    mapClicked($event: MouseEvent) {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: true
      });
    }
    
    markerDragEnd(m: markers, $event: MouseEvent) {
      console.log('dragEnd', m, $event);
    }
    markerclick()
    {
      this.disable3=true;
  console.log("buhihbih",this.longitude[this.lattitude.length-1]);
  
//   if(this.num==i+1)
//   {console.log(" if numlength",this.num);
  
// this.markers[i].iconUrl="https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
// console.log("iconUrl",this.markers[i].iconUrl);

//   }


  // this.locationmarker_lat=this.locationmarker_lat+0.000333;
  // this.locationmarker_long= this.locationmarker_long+0.000562;

  
  // this.locationmarker_lat=this.locationmarker_lat+this.responseObj.latitude;
  // this.locationmarker_long= this.locationmarker_long+this.responseObj.longitude;
  // this.markers[this.lattitude.length-1].lat=this.locationmarker_lat;
  // this.markers[this.lattitude.length-1].lng=this.locationmarker_long;
  let self=this;
  this.markers[this.lattitude.length-1].lat=this.responseObj.latitude;
  this.markers[this.lattitude.length-1].long=this.responseObj.longitude;
  console.log("update markr by location",this.markers[this.lattitude.length-1].lat,this.markers[this.lattitude.length-1].long);
  console.log("update markrjkukubhki",this.locationmarker_lat,this.locationmarker_long);
this.busdataset.Address=this.responseObj.address;
  this.busdataset.stoppage[this.placelistmarker.length-1]._lat=this.responseObj.latitude;
  this.busdataset.stoppage[this.placelistmarker.length-1]._long=this.responseObj.longitude;
  
   this.BusCollection.doc(this.searchbus).update(this.busdataset)
      this.time=setTimeout(()=>{
        self.markers[this.lattitude.length-1].lat=self.responseObj.latitude;
  self.markers[this.lattitude.length-1].long=self.responseObj.longitude;
        this.markerclick();
        console.log("inside log set time out",self.locationmarker_long, self.locationmarker_lat);
        
  //       this.locationmarker_lat=this.lattitude[this.lattitude.length-1]+0.000333;
  // this.locationmarker_long=this.longitude[this.lattitude.length-1]+0.000562;
  // this.newlat=this.locationmarker_lat;
  // this.newlong=this.locationmarker_long;
      //   this.lat=this.lat+0.00333;
      // this.lng=this.lng+0.003562;
        // that.messageSuccess = false;

      // update(stoppage[this.lattitude.length-1]._lat:this.locationmarker_lat)
      //   this.BusCollection.update(busses);
      },1000);
      
    }
    UpdateStatus()
{
  this.busdataset.statusvalue=false;
  this.disable4=true;
  this.BusCollection.doc(this.searchbus).update(this.busdataset)
}
    sclick(){
      this.markers[this.lattitude.length-1].lat = this.locationmarker_lat1
      this.markers[this.lattitude.length-1].long=   this.locationmarker_long1;
      // this.locationmarker_lat=  this.locationmarker_lat1;
      // this.locationmarker_long= this.locationmarker_long1;

    clearTimeout(this.time);
  
    }
  }    
interface markers {
	lat: number;
	lng: number;
	label?: string;
  draggable: boolean;
  iconUrl:string;

}
