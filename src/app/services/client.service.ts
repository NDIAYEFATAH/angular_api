import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  createClient(request: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrld}/client`, request);
  }

  listClient(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.apiUrld}/client`);
  }

  getClient(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrld}/client/${id}`);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrld}/client/${id}`);
  }

  updateClient(id: string, client: Client): Observable<any> {
    return this.http.put<any>(`${environment.apiUrld}/client/${id}`, client);
  }
}
