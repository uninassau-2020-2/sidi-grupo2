import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Location} from '../location';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepServiceService {
  constructor(private http: HttpClient) {
  }

  getLocation(cep): Observable<Location> {
    return this.http.get<Location>(`http://localhost:8081/zipCode/${cep}`);
  }
}
