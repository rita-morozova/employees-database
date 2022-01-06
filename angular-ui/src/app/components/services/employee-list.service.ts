import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8083/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService {

  constructor(private httpClient: HttpClient) { }

  getEmployeesList() {
    return this.httpClient.get(`${baseUrl}/employees`)
  }

  getEmployee(id) {
    return this.httpClient.get(`${baseUrl}/employee/${id}`)
  }

  addEmployee(employee) {
    return this.httpClient.post(`${baseUrl}/employees`, employee)
  }

  editEmployee(id, data) {
    return this.httpClient.put(`${baseUrl}/employee/${id}`, data)
  }

  deleteEmployee(id) {
    return this.httpClient.delete(`${baseUrl}/employee/${id}`)
  }


}
