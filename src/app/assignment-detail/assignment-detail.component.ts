import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../assignments/assignment.model';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  // @Input() transmittedAssignment?:Assignment;
  @Output() deleteAssignmentEvent = new EventEmitter<Assignment>();
  transmittedAssignment?: Assignment

  constructor(private assignmentService: AssignmentsService, private route: ActivatedRoute, private router: Router) { }
  assignmentDelete?: Assignment = undefined;
  ngOnInit(): void {
    // console.log("Transmitted Assignment= "+ this.transmittedAssignment)
    const id: number = +this.route.snapshot.params['id'];
    console.log("id=" + id);

    this.assignmentService.getAssignmentById(id).subscribe(assignment => this.transmittedAssignment = assignment);
  }
  checkAssignment() {
    if (this.transmittedAssignment != null)
      this.assignmentService.updateAssignment(this.transmittedAssignment).subscribe(message => { console.log(message); 
      this.router.navigate(["/home"])});
    // this.transmittedAssignment.due=true;
  }
  onDelete(assignment:Assignment){
    this.assignmentService.deleteAssignment(assignment).subscribe(message => {
      console.log(message);
      this.router.navigate(["/home"])

    })
  }
}
