import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Assignment } from '../assignments/assignment.model';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  @Output() addNewAssignment = new EventEmitter<Assignment>();
  constructor(private assignmentService:AssignmentsService, private router:Router) { }
  nameAssignment: string = '';
  dueDate?: Date = undefined; // ?:it means it is possible to be null
  selectedAssignment?:Assignment=undefined;
  ngOnInit(): void {
  }
  onSubmit() {

    if (this.nameAssignment && this.dueDate) {
      let newAssignment = new Assignment();
      newAssignment.id = Math.floor((Math.random() * 100) + 1);
      newAssignment.name = this.nameAssignment;
      newAssignment.dueDate = this.dueDate;
      newAssignment.due = false;

      this.assignmentService.addAssignment(newAssignment).subscribe(message => {

        this.router.navigate(["/home"]);
      });
      }
  }
  assignmentClick(assignment:Assignment){

    this.selectedAssignment=assignment;
  }
}
