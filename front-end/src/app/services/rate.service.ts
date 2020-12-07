import { Injectable } from '@angular/core';
import { Individual } from '../models/individual.model';
// import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RateService {
  url: string = environment.serverURL;
  // private currentToysSubject: BehaviorSubject<Toy[]>;

  constructor(private http: HttpClient) {
    // this.currentToysSubject = new BehaviorSubject<Toy[]>([]);
  }

  ratePost(individualId: string, rating: number, text: string, userInfo: User) {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo.token}`,
    });
    let options = { headers: headers };
    return this.http.post<any>(
      `${this.url}/api/rate`,
      {
        individualId,
        rating,
        text,
      },
      options
    );
  }

  rateDelete(rateId: string, individualId: string, userInfo: User) {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo.token}`,
    });
    let options = {
      headers: headers,
      body: {
        isAdmin: userInfo.isAdmin,
        rateId: rateId,
        individualId: individualId,
      },
    };
    return this.http.delete<any>(`${this.url}/api/rate/${rateId}`, options);
  }

  rateEdit(
    rateId: string,
    rating: number,
    text: string,
    individualId: string,
    userInfo: User
  ) {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo.token}`,
    });
    let options = { headers: headers };

    return this.http.put<any>(
      `${this.url}/api/rate/${rateId}`,
      {
        rateId: rateId,
        rating: rating,
        text: text,
        individualId: individualId,
      },
      options
    );
  }
}
