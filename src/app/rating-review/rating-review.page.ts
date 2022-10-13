import { Component, OnInit } from '@angular/core';
import { IonicRatingModule } from 'ionic-rating';
import { endpoints } from '../common/endpoint';
import { ApiserviceService } from '../service/apiservice.service';
import { HelperserviceService } from '../service/helperservice.service';

@Component({
  selector: 'app-rating-review',
  templateUrl: './rating-review.page.html',
  styleUrls: ['./rating-review.page.scss'],
})
export class RatingReviewPage implements OnInit {

  rate: any;
  comment: any;
  Fetch_Rating: any = [];

  constructor(public rating: IonicRatingModule,
    public api: ApiserviceService,
    public helper: HelperserviceService) { }

  ngOnInit() {
    console.log("store_id", this.api.store_id);
    this.Fetch_store_Rating();

  }


  onRatingChange(event) {
    console.log(event);

  }

  Rating_Review() {
    this.helper.showLoading();
    this.api.post(endpoints.Rating_Review_save(), {
      store_id: this.api.store_id,
      ratings: this.rate,
      review: this.comment,
   
    }).subscribe((resp: any) => {

      console.log(resp);

      if (resp.status == 'success') {
        this.helper.hideLoading();
        this.rate = '';
        this.comment = '';
        this.Fetch_Rating();
        this.helper.presentToast(resp.msg);
      }
      else{
        this.helper.hideLoading();
        this.rate= '';
        this.comment='';
        this.helper.presentToast(resp.msg.ratings[0]);
      }
    }, error=>{
      this.helper.hideLoading();
      this.helper.presentToast(error);
      
    });
  }

  Fetch_store_Rating() {
    this.helper.showLoading();
    this.api.get(endpoints.Fetch_Rating()).subscribe((resp: any) => {
      console.log(resp);
      this.Fetch_Rating = resp.data.reviews;
      this.helper.hideLoading();

    });

  }





}
