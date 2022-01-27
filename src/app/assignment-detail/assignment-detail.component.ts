import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() transmittedAssignment?:Assignment;
  @Output() deleteAssignmentEvent = new EventEmitter<Assignment>();


  constructor(private assignmentService:AssignmentsService) { }
  assignmentDelete?:Assignment=undefined;
  ngOnInit(): void {
    console.log("Transmitted Assignment= "+ this.transmittedAssignment)
  }
  checkAssignment(){
    if(this.transmittedAssignment!=null)
    this.assignmentService.updateAssignment(this.transmittedAssignment).subscribe(message=>console.log(message));
    // this.transmittedAssignment.due=true;
  }
}
