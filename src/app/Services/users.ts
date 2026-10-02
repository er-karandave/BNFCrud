import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Users {
  
  private apiUrl = 'https://localhost:7066/api/User'; 

  constructor(private http: HttpClient) {}
  // Method to fetch data from the backend
  PostData(req:any): Observable<any[]> {
      return this.http.post<any[]>(this.apiUrl ,req);
  }

   GetData(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
  }

  DeleteData(req: any): Observable<any[]> {
      return this.http.delete<any[]>(this.apiUrl + `?userId=${req.userId}`);
  }
}
