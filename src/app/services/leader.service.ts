import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { of, Observable } from 'rxjs'
import  { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgSErvice: ProcessHTTPMsgService) { }
  getLeaders(): Observable<leader[]> {
    return this.http.get<leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.processHTTPMsgSErvice.handleError));
    // return of(LEADERS).pipe(delay(2000))
  }
  getLeader(id: string): Observable<leader> {
    return this.http.get<leader>(baseURL + 'leadership/' + id)
    .pipe(catchError(this.processHTTPMsgSErvice.handleError));
    //  return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
  }
  getFeaturedLeader(): Observable<leader> {
    return this.http.get<leader>(baseURL + 'leadership?featured=true')
    .pipe(map(leader => leader[0]))
    .pipe(catchError(this.processHTTPMsgSErvice.handleError)); 
    // return of(LEADERS.filter((leader) => (leader.featured))[0]).pipe(delay(2000))
  }

}
