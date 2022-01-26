import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() transmittedAssignment?:Assignment;
  constructor() { }

  ngOnInit(): void {
    console.log("Transmitted Assignment= "+ this.transmittedAssignment)
  }
  checkAssignment(){
    if(this.transmittedAssignment!=null)
    this.transmittedAssignment.due=true;
  }
}
