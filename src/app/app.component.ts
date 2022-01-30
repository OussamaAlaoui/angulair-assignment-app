import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Assignment } from './assignments/assignment.model';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // for properties and methods

  nameDev = 'Oussama Alaoui Ismaili'; // this is a model
  titre = 'Assignment Management Project';
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private assignmentService: AssignmentsService
  ) {}

  onLogin() {
    if (this.authService.loggedIn) {
      this.authService.logout();
      this.router.navigate(['/home']);
    } else this.authService.login();
  }

  initializeData() {
    this.assignmentService.insertData().subscribe((message) => {
      console.log('ALL ASSIGNMENT ARE ADDED');
      window.location.reload();
      // this.router.navigate(["/home"],{replaceUrl:true});
    });
  }
  deleteAll() {
    this.assignmentService.deleteAllAssignments();
  }
}
