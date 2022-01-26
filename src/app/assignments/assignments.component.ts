import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Asignment Management';
  // ajoutActive = true; // this is related to the view so when we change it will change it
  assignments: Assignment[] = [
    {
      name: 'Devoir Angular 1',
      dueDate: new Date('2022-01-23'),
      due: false,
    },
    {
      name: 'Devoir Angular 2',
      dueDate: new Date('2022-01-23'),
      due: false,
    },
    {
      name: 'Devoir Angular 3',
      dueDate: new Date('2022-01-23'),
      due: true,
    },
  ];
 formVisible:boolean = false;
  nameAssignment: string = '';
  dueDate?: Date = undefined; // ?:it means it is possible to be null
  constructor() {}
  selectedAssignment?:Assignment=undefined;
  ngOnInit(): void {
    // this is where we define thing that will be executed before displaying anything
    // called before the displaying
    // console.log('before displaying');
    // setTimeout(() => {
    //   console.log('called after 3s...');
    //   this.ajoutActive = false;
    // }, 3000);
  }
  addAssignmentClick(){
    this.formVisible=true;
    // console.log(ev);
    // this.assignments.push(newAssignment);
  }
  addAssignment(assignment:Assignment){
  
    console.log(assignment);
    this.assignments.push(assignment);
    this.formVisible=false;
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
  assignmentClick(assignment:Assignment){
    // console.log("This assignment was clicked: ", assignment.name)
    this.selectedAssignment=assignment;
  }
}
