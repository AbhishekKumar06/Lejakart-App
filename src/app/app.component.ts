import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { endpoints } from './common/endpoint';
import { ApiserviceService } from './service/apiservice.service';
import { HelperserviceService } from './service/helperservice.service';
import { NavigationService } from './service/navigation.service';
import { NavigationExtras } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { LocationComponent } from './location/location.component';
// import { Geolocation } from '@capacitor/geolocation';





@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: 'tabs/home',
      icon: 'home'
    },
    {
      title: 'My Orders',
      url: '/orderlist',
      icon: 'cart'
    },
    {
      title: 'Stores',
      url: '/stores',
      icon: 'storefront'
    },
    {
      title: 'My Account',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'About Us',
      url: '/aboutus',
      icon: 'information-circle'
    },
    {
      title: 'Help Center',
      url: '/contactus',
      icon: 'call'
    },
    {
    
      title: 'Log Out',
      url: '/login',
      icon: 'log-out'
       
    },
   
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public router:Router,
    public modalController: ModalController,
    public helper: HelperserviceService,
    public api: ApiserviceService,
    public nav: NavigationService,
    private popoverController: PopoverController,
   ) {}

ngOnInit(){
this.api.name;
console.log("name",this.api.name);

}



  Logout(url){
    if(url === '/login'){
 this.api.post(endpoints.Log_out(),{

 }).subscribe((resp:any) => {
  console.log(resp);
   });
}
  }

  
}
