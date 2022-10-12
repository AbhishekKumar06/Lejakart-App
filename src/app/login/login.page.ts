import { Component, OnInit } from '@angular/core';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: any;
  mobile: any;
  pwd: any;
  fromPage: any = '';

  constructor(public helper: HelperserviceService, public api: ApiserviceService, public router: Router, public nav: NavigationService) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.fromPage = this.router.getCurrentNavigation().extras.state.from;

    }
    console.log("From", this.fromPage);


  }
  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }

    return (false)
  }
  Login() {
    if (this.email == '' || this.email == null) {
      this.helper.presentToast("Please Enter your email");
    }
    else if (this.ValidateEmail(this.email) == false) {
      this.helper.presentToast("You have entered an invalid email address!");
    }
    else if (this.mobile == '' || this.mobile == null) {
      this.helper.presentToast("Please Enter your Mobile Number");
    }
    else if (this.mobile.length < 10) {
      this.helper.presentToast("Please Enter Valid Mobile Number");
    }
    else if (this.pwd == '' || this.pwd == null) {
      this.helper.presentToast("Please Enter the Password");
    }
    else {
      this.helper.showLoading();
      this.api.post(endpoints.signin(), {
        email: this.email,
        mobile_number: this.mobile,
        password: this.pwd,
      }).subscribe((resp: any) => {

        console.log(resp);

        if (resp.status == "success") {
          this.helper.hideLoading();
          localStorage.setItem('quantamToken', resp.data.token);
          localStorage.setItem('User_Id', resp.data.user.id);
          localStorage.setItem('name', resp.data.user.name);
          localStorage.setItem('email', resp.data.user.email);
          this.api.user_id = resp.data.user.id;
          this.api.name = localStorage.getItem('name');
          this.api.email = localStorage.getItem('email');
          console.log("user_id", this.api.user_id);
          this.helper.presentToast(resp.msg);
          this.router.navigateByUrl('tabs/home');
          this.email = "";
          this.pwd = "";
          this.mobile = "";
          if (this.fromPage == 'ProductdetailPage') {
            const navigationExtras: NavigationExtras = {
              state: {
                from: this.fromPage
              }
            };
            this.nav.go('/productdetails', navigationExtras);
          }
        }
        else {
          this.helper.hideLoading();
          this.helper.presentToast(resp.msg);
          this.email = "";
          this.pwd = "";
          this.mobile = "";

        }


      });

    }
  }


}
