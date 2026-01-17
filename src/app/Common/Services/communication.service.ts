import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  ret: any[] = [];
  constructor(private httpClient: HttpClient) { }

  public getRequest(apiServer: string): Observable<any[]> {
    return this.httpClient.get<any[]>(apiServer);
  }

  public postRequest(apiServer: string, sendData: any[]): Observable<any[]> {
    return this.httpClient.post<any[]>(apiServer, sendData);
  }
}
