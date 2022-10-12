import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AccounteditpopupPage } from '../accounteditpopup/accounteditpopup.page';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';

@Component({
  selector: 'app-accountsettings',
  templateUrl: './accountsettings.page.html',
  styleUrls: ['./accountsettings.page.scss'],
})
export class AccountsettingsPage implements OnInit {
  AccountDetail: any = {};

  constructor(public router: Router,
    public modalController: ModalController,
    public helper: HelperserviceService,
    public api: ApiserviceService,
    public nav: NavigationService,) { }

  ngOnInit() {
    this.AccountInfo();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AccounteditpopupPage,
      cssClass: 'account-edit-modal',
      backdropDismiss: true,
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.AccountInfo();
    });
    return await modal.present();
  }

  AccountInfo() {
    this.helper.showLoading();
    this.api.get(endpoints.Account_Info()).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == "success") {
        this.AccountDetail = resp.data;
        this.helper.hideLoading();
      } else {
        this.helper.hideLoading();
      }

    }, error => {
      if (error) {
        this.helper.hideLoading();
      }
    });

  }


}
