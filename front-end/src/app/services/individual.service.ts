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
export class IndividualService {
  url: string = environment.serverURL;
  // private currentToysSubject: BehaviorSubject<Toy[]>;

  constructor(private http: HttpClient) {
    // this.currentToysSubject = new BehaviorSubject<Toy[]>([]);
  }

  calculateRate(p: Individual) {
    let total = 0;
    if (p.rates.length > 0) {
      for (let i = 0; i < p.rates.length; i++) {
        total += p.rates[i].rating;
      }
      return total / p.rates.length;
    }
    return 0;
  }

  individualBrowse() {
    return this.http.get<Individual[]>(`${this.url}/api/individual`).pipe(
      map((individuals) => {
        // this.currentToysSubject.next(toys);

        return individuals;
      })
    );
  }

  detailIndividual(id: string) {
    return this.http.get<any>(`${this.url}/api/individual/${id}`);
  }

  individualUploadImage(fileToUpload: File) {
    let formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http.post<any>(
      `${this.url}/api/individual/uploadImage`,
      formData
    );
  }
  individualPost(
    name: string,
    fileUpload: string,
    description: string,
    userInfo: User
  ) {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo.token}`,
    });
    let options = { headers: headers };
    return this.http.post<any>(
      `${this.url}/api/individual`,
      {
        name,
        image: fileUpload,
        description,
        isAdmin: userInfo.isAdmin,
      },
      options
    );
  }

  deleteIndividual(id: string, userInfo: User) {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo.token}`,
    });
    let options = {
      headers: headers,
      body: { isAdmin: userInfo.isAdmin },
    };
    return this.http.delete<Individual>(
      `${this.url}/api/individual/${id}`,
      options
    );
  }

  editIndividual(
    id: string,
    name: string,
    fileUpload: string,
    description: string,
    userInfo: User
  ) {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo.token}`,
    });
    let options = { headers: headers };
    return this.http.put<any>(
      `${this.url}/api/individual/${id}`,
      { name, image: fileUpload, description, isAdmin: userInfo.isAdmin },
      options
    );
  }
}
