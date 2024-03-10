import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseUrl: string = environment.nodeAppUrl;


  constructor(private http: HttpClient) { }
  // Generic Get
  genericGet(endpoint: string) {
    return this.http.get(this.baseUrl + endpoint)
  }

  // Generic Post
  genericPost(endpoint:string, payload:any) {
    return this.http.post(this.baseUrl+endpoint, payload)
  }

}
