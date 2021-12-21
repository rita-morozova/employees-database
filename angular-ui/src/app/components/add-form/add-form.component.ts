import { Component, OnInit } from '@angular/core';
import { EmployeeListService } from '../services/employee-list.service';
import { Employee } from 'src/app/common/employee';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  addFormGroup: FormGroup;
  employee: any = new Employee();
  states = [
    'AL',
    'AK',
    'AS',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FM',
    'FL',
    'GA',
    'GU',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MH',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'PR',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VI',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];


  constructor(private employeeService: EmployeeListService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private token: TokenStorageService
  ) { }

  ngOnInit(): void {
    if (this.token.getToken()) {
      // console.log(this.token.getToken())
      this.displayForm();
      this.getEmployee(this.route.snapshot.paramMap.get('id'));
    }
  }

  displayForm() {
    this.addFormGroup = this.formBuilder.group({
      firstName: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(35), Validators.pattern("[A-Za-z]*"), CustomValidator.notOnlyWhiteSpace]),
      lastName: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(35), Validators.pattern("[A-Za-z]*"), CustomValidator.notOnlyWhiteSpace]),
      address: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(50), Validators.pattern("[A-Za-z\\'\\- 0-9]*"), CustomValidator.notOnlyWhiteSpace]),
      state: new FormControl("", [Validators.required]),
      zip: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(9), Validators.pattern("[0-9]*"), CustomValidator.notOnlyWhiteSpace]),
      cellPhone: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]*"), CustomValidator.notOnlyWhiteSpace]),
      email: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    })
  }

  // getters used by the HTML template to get access to the form control
  // and check if the form is valid
  get id() { return this.addFormGroup.get('id') }
  get firstName() { return this.addFormGroup.get('firstName') }
  get lastName() { return this.addFormGroup.get('lastName') }
  get address() { return this.addFormGroup.get('address') }
  get state() { return this.addFormGroup.get('state') }
  get zip() { return this.addFormGroup.get('zip') }
  get cellPhone() { return this.addFormGroup.get('cellPhone') }
  get email() { return this.addFormGroup.get('email') }

  onSubmit() {
    if (this.employee.userId === null || this.employee.userId === undefined) {
      this.addEmployee();
    } else {
      this.updateEmployee();
    }
  }

  addEmployee() {
    if (this.addFormGroup.invalid) {
      this.addFormGroup.markAllAsTouched();
      return;
    }
    this.employeeService.addEmployee(this.addFormGroup.value)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(["/employees"]);
        },
        error => {
          console.log(error);
        }
      )
  }

  getEmployee(id) {
    if (id === null || id === undefined) {
      this.employee = {
        id: null,
        userId: null,
        firstName: null,
        lastName: null,
        address: null,
        state: null,
        zip: null,
        cellPhone: null,
        email: null
      }
    } else {
      this.employee = this.employeeService.getEmployee(id)
        .subscribe(
          data => {
            this.employee = data;
            this.addFormGroup.setValue({
              firstName: this.employee.firstName,
              lastName: this.employee.lastName,
              address: this.employee.address,
              state: this.employee.state,
              zip: this.employee.zip,
              cellPhone: this.employee.cellPhone,
              email: this.employee.email
            })
          }
        )
    }
  }

  getEmployeeDetails() {
    this.employee.firstName = this.addFormGroup.value.firstName;
    this.employee.lastName = this.addFormGroup.value.lastName;
    this.employee.address = this.addFormGroup.value.address;
    this.employee.state = this.addFormGroup.value.state;
    this.employee.zip = this.addFormGroup.value.zip;
    this.employee.cellPhone = this.addFormGroup.value.cellPhone;
    this.employee.email = this.addFormGroup.value.email;
  }

  updateEmployee() {
    if (this.addFormGroup.invalid) {
      this.addFormGroup.markAllAsTouched();
      return;
    }
    this.getEmployeeDetails();
    this.employeeService.editEmployee(this.employee.userId, this.employee)
      .subscribe(
        data => {
          this.employee = data
          // console.log(data)
          this.router.navigate(["/employees"]);
        },
        error => {
          console.log(error);
        }
      )
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.employee.userId)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(["/employees"])
        },
        err => {
          console.log(err)
        }
      )
  }

}
