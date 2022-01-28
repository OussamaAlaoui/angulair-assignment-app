import { unescapeIdentifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../assignments/assignment.model';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment?: Assignment = undefined;
  assignmentName: string = '';
  dueDate?: Date = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assignmentService: AssignmentsService
  ) {}

  ngOnInit(): void {
    // getting the parameters
    console.log("Query params :---------");
    console.log(this.route.snapshot.queryParams);



    let id = +this.route.snapshot.params['id'];
    // alert(id);
    this.assignmentService.getAssignmentById(id).subscribe((assignment) => {
      if (assignment) {
        this.assignment = assignment;
        this.assignmentName = assignment?.name;
        this.dueDate = assignment?.dueDate;
      }
    });
  }
  onSaveAssignment() {
    let id = +this.route.snapshot.params['id'];
    if (this.assignment && this.dueDate)
      this.assignmentService.getAssignmentById(id).subscribe((assignment) => {
        if (assignment && this.dueDate) {
          assignment.name = this.assignmentName;
          assignment.dueDate = this.dueDate;
          this.router.navigate(['/home']);
        }
      });
    // this.assignmentService.updateAssignmentData(this.assignment).subscribe(message =>{

    //   console.log(message);
    //   this.router.navigate(["/home"]);
    // })
  }
}
