import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, studentCertificate } from './modal/student';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseUrl = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}

  getStudentApi(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseUrl);
  }

  addUserApi(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'addUser', data);
  }

  addCertificateApi(id: any, data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'addCertificate/' + id, data);
  }

  delCertificateApi(id: any, cid: any): Observable<any> {
    return this.httpClient.delete(
      this.baseUrl + 'delCertificate/' + id + '/' + cid
    );
  }
  deleteUser(id: any): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'delUser/' + id);
  }

  editCertificateApi(id: any, cid: any, data: any): Observable<any> {
    return this.httpClient.put(
      this.baseUrl + 'editCertificate/' + id + '/' + cid,
      data
    );
  }
}
