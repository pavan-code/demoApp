import { Injectable } from '@angular/core';
import { feedback } from '../shared/feedback'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  submitFeedback(fb: feedback): Observable<feedback> {
    return this.http.post<feedback>(baseURL + 'feedback', fb)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
