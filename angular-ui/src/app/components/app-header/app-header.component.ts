import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  isUserLoggedIn: boolean = false;

  constructor(private token: TokenStorageService,
    public login: LoginService) { }

  ngOnInit(): void { }

  logOut() {
    this.token.signOut();
    window.location.reload();
  }

}
