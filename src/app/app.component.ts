import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // for properties and methods
  title = 'assignment-app';
  nameDev = 'Oussama Alaoui Ismaili'; // this is a model

constructor (private authService:AuthService, private router:Router){}
  onLogin(){
    if(this.authService.loggedIn)
    {
      this.authService.logout();
      this.router.navigate(['/home']);
    }
    else 
    this.authService.login();
  }
}
