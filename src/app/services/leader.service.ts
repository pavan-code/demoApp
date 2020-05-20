import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { of, Observable } from 'rxjs'
import  { delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders(): Observable<leader[]> {
    return of(LEADERS).pipe(delay(2000))
  }
  getLeader(id: string): Observable<leader> {
     return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
  }
  getFeaturedLeader(): Observable<leader> {
    return of(LEADERS.filter((leader) => (leader.featured))[0]).pipe(delay(2000))
  }

}