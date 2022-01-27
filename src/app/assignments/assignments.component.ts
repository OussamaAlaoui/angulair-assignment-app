import { Component, Input, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Asignment Management';
  assignments: Assignment[] = [];
  formVisible: boolean = false;
  nameAssignment: string = '';
  dueDate?: Date = undefined; // ?:it means it is possible to be null
  // we inject things in the constructor 
  constructor(private assignmentsService:AssignmentsService ) { }
  selectedAssignment?: Assignment = undefined;
  ngOnInit(): void {
    // get the assignments from the service 
    // the service will a request AJAX on a web service
    console.log("We are getting the assignments from the service!!")
     this.assignmentsService.getAssignments().subscribe(assignments=> {
       // here we are sure that the data is here, basically it replaces the async await 
       console.log("We received the data")
       this.assignments= assignments;
     });
     console.log("request is send to the service");
    // this is where we define thing that will be executed before displaying anything
    // called before the displaying
    // console.log('before displaying');
    // setTimeout(() => {
    //   console.log('called after 3s...');
    //   this.ajoutActive = false;
    // }, 3000);
    // if(this.assignmentToDelete)
    // this.assignments.splice(this.assignments.indexOf(this.assignmentToDelete,1))
  }
  // addAssignmentClick() {
  //   this.formVisible = true;
  //   // console.log(ev);
  //   // this.assignments.push(newAssignment);
  // }
  addAssignment(assignment: Assignment) {

    // console.log(assignment);
    // this.assignments.push(assignment);
    this.assignmentsService.addAssignment(assignment).subscribe(message => {console.log(message);    this.formVisible = false;});

  }
  // onSubmit() {
  //   console.log(this.dueDate);
  //   if (this.nameAssignment && this.dueDate) {
  //     let newAssignment = new Assignment();
  //     newAssignment.name = this.nameAssignment;
  //     newAssignment.dueDate = this.dueDate;
  //     newAssignment.due = false;
  // this.formVisible=false;
  //     this.assignments.push(newAssignment);

  //   }
  // }
  assignmentClick(assignment: Assignment) {
    // console.log("This assignment was clicked: ", assignment.name)
    this.selectedAssignment = assignment;
  }
  deleteTransmittedAssignment(assignment: Assignment) {
    console.log(assignment);
    // this.assignments.splice(this.assignments.indexOf(assignment), 1);
    this.assignmentsService.deleteAssignment(assignment);
    this.selectedAssignment = undefined;

  }
}
