import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddFormComponent } from './components/add-form/add-form.component';
import { AuthGuardService as AuthGuard } from './components/services/auth-guard.service';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';



const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "employee/:id", component: AddFormComponent, canActivate: [AuthGuard] },
  { path: "employees/add", component: AddFormComponent, canActivate: [AuthGuard] },
  { path: "employees", component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "", pathMatch: "full" }

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeListComponent,
    AddFormComponent,
    AppHeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MDBBootstrapModule.forRoot(),
    NoopAnimationsModule,
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
