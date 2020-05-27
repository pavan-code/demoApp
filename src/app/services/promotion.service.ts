import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotion')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError))
    // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000))
  }
  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true')
    .pipe(map(promo => promo[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError))
    // return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(delay(2000))
  }
}
