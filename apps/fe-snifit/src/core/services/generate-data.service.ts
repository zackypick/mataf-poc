import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class GenerateDataService {
  constructor(private httpClient: HttpClient) {}

  generate(): Observable<Object> {
    return this.httpClient.get(`/generator/api/generate`);
  }

  clean(): Observable<Object> {
    return this.httpClient.get('/generator/api/flush');
  }
}
