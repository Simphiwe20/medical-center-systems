import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  url: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  genericPost(endPoint: string, payload: any) {
    return this.http.post(`${this.url}${endPoint}`, payload)
  }

  genericGet(endPoint: string) {
    return this.http.get(`${this.url}${endPoint}`)
  }

  genericUpdate(endPoint: string, payload: any) {
    return this.http.put(`${this.url}${endPoint}`, payload)
  }

}
