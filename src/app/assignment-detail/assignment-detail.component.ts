import { Component, Input,EventEmitter, OnInit, Output } from '@angular/core';

import { Assignment } from '../assignments/assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() transmittedAssignment?:Assignment;
  @Output() deleteAssignmentEvent = new EventEmitter<Assignment>();


  constructor() { }
  assignmentDelete?:Assignment=undefined;
  ngOnInit(): void {
    console.log("Transmitted Assignment= "+ this.transmittedAssignment)
  }
  checkAssignment(){
    if(this.transmittedAssignment!=null)
    this.transmittedAssignment.due=true;
  }
  deleteAssignment(assignment:Assignment){
    this.deleteAssignmentEvent.emit(assignment);
  }

}
