import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Assignment Management Project';

  assignments: Assignment[] = [];
  formVisible: boolean = false;
  nameAssignment: string = '';
  dueDate?: Date = undefined; // ?:it means it is possible to be null
  page: number = 1;
  limit: number = 10;
  totalDocs?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  prevPage?: number;
  hasNextPage?: boolean;
  nextPage?: number;
  menuListItems?: number[] = [10, 25, 50, 100];
  clickMenuItem(item:number){
    this.limit=item;
       this.getAssignments();
  }
  displayedColumns: string[] = [
    'check',
    'more',
    'id',

    'name',
    'dueDate',
    'isDue',
    'actions',
  ];
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(
    window.location.host
  );
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  constructor(
    private assignmentsService: AssignmentsService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  selectedAssignment?: Assignment = undefined;
  ngOnInit(): void {
    this.getAssignments();

    // this.pages;
  }

  nextPageBtn(): void {
    if (this.nextPage) this.page = this.nextPage;
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentsService
      .getAssignmentsPagination(this.page, this.limit)
      .subscribe((data) => {
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log('We got the data!!! -- limit=' + this.limit);
        this.assignments = data.docs;
      });
  }
  getDetails(assignment: Assignment) {}
  firstPageBtn() {
    if (this.prevPage) this.page = 1;
    this.getAssignments();
  }
  onSubmit() {
    if (this.page) this.page = this.page;
    this.getAssignments();
  }
  lastPageBtn() {
    if (this.totalPages) this.page = this.totalPages;
    this.getAssignments();
  }
  prevPageBtn(): void {
    if (this.prevPage) this.page = this.prevPage;
    this.getAssignments();
  }
  addAssignment(assignment: Assignment) {
    this.assignmentsService.addAssignment(assignment).subscribe((response) => {
      console.log(response.message);
      this.formVisible = false;
    });
  }

  assignmentClick(assignment: Assignment) {
    this.selectedAssignment = assignment;
  }
  deleteTransmittedAssignment(assignment: Assignment) {
    this.assignmentsService.deleteAssignment(assignment);
    this.selectedAssignment = undefined;
  }
  onDeleteAssignment(assignment: Assignment) {
    this.assignmentsService
      .deleteAssignment(assignment)
      .subscribe((response) => {
        console.log(response.message);
        this._snackBar.open(response.message, '', {
          duration: 2000,
          panelClass: ['red-snackbar'],
        });
        this.getAssignments();
      });
  }
  onEditAssignment(assignment: Assignment) {
    this.router.navigate(['/assignment', assignment?.id, 'edit'], {
      queryParams: {
        name: 'Oussama',
        lastname: 'Alaoui',
        debug: true,
      },
      fragment: 'edition',
    });
  }
}
