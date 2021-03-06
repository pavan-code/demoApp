import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { leader } from '../shared/leader';
import { LeaderService} from '../services/leader.service';
import { flyInOut,expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  dishErrMsg : string;
  
  leader : leader;
  promotionErrMsg: any;
  leaderErrMsg: any;
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('baseURL') public baseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
        errMsg => this.dishErrMsg = <any>errMsg);
    this.promotionservice.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
        errMsg => this.promotionErrMsg = <any>errMsg);
    this.leaderservice.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
        errMsg => this.leaderErrMsg = <any>errMsg);
  }
}
