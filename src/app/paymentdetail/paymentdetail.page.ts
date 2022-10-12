import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {PaymentdetailpopupPage} from '../paymentdetailpopup/paymentdetailpopup.page';

@Component({
  selector: 'app-paymentdetail',
  templateUrl: './paymentdetail.page.html',
  styleUrls: ['./paymentdetail.page.scss'],
})
export class PaymentdetailPage implements OnInit {

  constructor(public modalController: ModalController) { }


  async presentModal() {
    const modal = await this.modalController.create({
      component: PaymentdetailpopupPage,
      cssClass: 'my-payment-detail'
    });
    return await modal.present();
  }

  
  ngOnInit() {
  }

}
