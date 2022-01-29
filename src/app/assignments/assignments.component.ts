import { Component, Input, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Assignment Management';

  assignments: Assignment[] = [
   
  ];
  formVisible: boolean = false;
  nameAssignment: string = '';
  dueDate?: Date = undefined; // ?:it means it is possible to be null

  constructor(private assignmentsService: AssignmentsService) { }
  selectedAssignment?: Assignment = undefined;
  ngOnInit(): void {

    this.assignmentsService.getAssignments().subscribe(assignments => {

console.log(assignments);
      this.assignments = assignments;
    });

  }
 
  addAssignment(assignment: Assignment) {


    this.assignmentsService.addAssignment(assignment).subscribe(response => { 
      console.log(response.message);
      this.formVisible = false; });

  }

  assignmentClick(assignment: Assignment) {
    this.selectedAssignment = assignment;
  }
  deleteTransmittedAssignment(assignment: Assignment) {
    this.assignmentsService.deleteAssignment(assignment);
    this.selectedAssignment = undefined;

  }
}
