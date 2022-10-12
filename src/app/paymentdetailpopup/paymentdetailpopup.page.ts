import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-paymentdetailpopup',
  templateUrl: './paymentdetailpopup.page.html',
  styleUrls: ['./paymentdetailpopup.page.scss'],
})
export class PaymentdetailpopupPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  closeModal() {
    this.modalCtrl.dismiss();
}
  ngOnInit() {
  }

}
