import { Component, OnInit } from '@angular/core';
import { EmployeeListService } from '../services/employee-list.service';
import { TokenStorageService } from '../services/token-storage.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: any;

  constructor(private employeeService: EmployeeListService,
    private token: TokenStorageService
  ) { }

  ngOnInit() {
    if (this.token.getToken()) {
      this.listEmployees()
    } else {
      console.log("Access denied")
    }
  }

  listEmployees() {
    // method is invoked once you "subscribe"
    this.employeeService.getEmployeesList()
      .subscribe(
        data => {
          this.employees = data;

          // sort employees
          let sorted = this.employees.sort((a, b) => {
            a = (a.firstName + a.lastName).toLowerCase();
            b = (b.firstName + b.lastName).toLowerCase();

            return a < b ? -1 : a > b ? 1 : 0
          })

          this.employees = sorted;
        },
        error => {
          console.log(error);
        }
      )
  }


}
