
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
    let id = +this.route.snapshot.params['id'];
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
    let newAssignment = new Assignment();

    if (this.assignment && this.dueDate)    
    newAssignment.dueDate= this.dueDate;
    newAssignment.name = this.assignmentName;
      this.assignmentService
        .updateAssignment(newAssignment)
        .subscribe((response) => {
          console.log(response.message);
            this.router.navigate(['/home']);
          }
        );
  }
}
