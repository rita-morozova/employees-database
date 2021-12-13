import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { TokenStorageService } from '../services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage = "Invalid Credentials";
  invalidLogin = false;
  isLoggedIn = false;
  submitted = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.displayLoginForm();
  }

  displayLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.minLength(8),Validators.maxLength(35), Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(35),  Validators.pattern("[A-Za-z\\'\\- 0-9]*")])
    })
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  onSubmit(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loginService.login(this.loginForm.value)
      .subscribe(
        data => {
          // console.log(data);
          this.tokenStorage.saveToken(data.accessToken);
          sessionStorage.setItem("authenticatedUser", data)
          this.isLoggedIn = true;
          // console.log("after" + this.loginService.isUserLoggedIn())
          this.router.navigate(["/employees"]);
        },
        error => {
          this.invalidLogin = true;
          console.log(error);
        }
      )
  }

}
