import { Component, OnInit, Inject } from '@angular/core';
import { leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut,expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {
  leaders: leader[];

  constructor(private leaderService: LeaderService,
    @Inject('baseURL') public baseURL) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
    .subscribe(leaders => this.leaders = leaders);
  }

}
