import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs'
import { Summon } from '../app/summon'
@Injectable({
  providedIn: 'root'
})
export class SummonService {

  private baseUrl = "http://localhost:8080/api/v1/employees"
  constructor(private http:HttpClient) { }

  saveSummon(summon):Observable<Summon>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set("Access-Control-Allow-Origin", "*").set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept").set("Access-Control-Allow-Methods","POST, GET, OPTIONS, DELETE, PUT");
    return this.http.post<Summon>(`${this.baseUrl}` + '/save', summon, {headers: headers});
  }

  // createEmployee(employee):Observable<Employee>{
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set("Access-Control-Allow-Origin", "*").set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept").set("Access-Control-Allow-Methods","POST, GET, OPTIONS, DELETE, PUT");
  //   return this.http.post<Employee>(${this.baseUrl} + '/save', employee, {headers: headers})
  // }
}
