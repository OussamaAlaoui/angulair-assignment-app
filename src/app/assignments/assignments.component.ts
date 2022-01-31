import { Component, Input, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from '../shared/auth.service';


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
  connectionError?: boolean;
  MenuTitle = 'Number of Docs ' + this.limit;
  isLoading: boolean = true;
  isHome: boolean = true;
  toDeleteAssignment?: Assignment = undefined;
  menuListItems?: number[] = [10, 25, 50, 100];
  dataSource: any;
  assignmentsChecked: Assignment[] = [];
  checkAll: boolean = false;

  clickMenuItem(item: number) {
    this.MenuTitle = 'Number of Docs';
    this.MenuTitle += ' ' + item.toString();
    this.limit = item;

    this.getAssignments();
  }

  displayedColumns: string[] = [
    'check',
    'more',
    'id',
    'name',
    'dueDate',
    'isDue',
    'delete',
    'edit',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  constructor(
    private assignmentsService: AssignmentsService,
    private _snackBar: MatSnackBar,
    private router: Router,
        private assignmentService: AssignmentsService,

    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  selectedAssignment?: Assignment = undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit(): void {
    this.getAssignments();

    if (this.router.url == 'home' || this.router.url == '') {
      this.isHome = true;
    } else this.isHome = false;
  }

  announceSortChange(sortState: Sort) {
    console.log(sortState.direction);
    if (sortState.direction) {
      console.log(sortState.direction);
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  nextPageBtn(): void {
    if (this.nextPage) this.page = this.nextPage;
    this.getAssignments();
  }
  openDialog(assignment: Assignment): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { assignment: assignment, toDeleteAssignment: assignment },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('result ----->' + result);
      // this.animal = result;
      this.getAssignments();
    });
  }
  openDialogAll(): void {
    console.log('------->' + this.assignmentsChecked);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogAll, {
      width: '250px',
      data: { assignmentsChecked: this.assignmentsChecked },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

      this.clickMenuItem(this.limit);
      this.assignmentsChecked = [];
      this.checkAll = false;

     
    });
  }
  getAssignments() {
    this.assignmentsService
      .getAssignmentsPagination(this.page, this.limit)
      .subscribe((data) => {
        if (data == undefined) {
          this.connectionError = true;
          this.isLoading = false;
        } else if (data.totalDocs == 0) console.log('No data found!!');
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
        this.dataSource = new MatTableDataSource(this.assignments);
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      });
  }
  DeleteAssignments() {
    if (this.checkAll) {
      this.assignmentsChecked = this.assignments;
      // this.assignments.forEach((assignment) => {
      //   this.onDeleteAssignment(assignment);
      //   this.getAssignments();
      // });
          this.openDialogAll();
    }else
    this.openDialogAll();
    // else
    //   this.assignmentsChecked.forEach((assignment) => {
    //     this.onDeleteAssignment(assignment);
    //     this.getAssignments();
    //   });
  }
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
        this._snackBar.open(response.message, 'Close', {
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

  addDelete(assignment: Assignment) {
    if (!this.containsObject(assignment, this.assignmentsChecked)) {
      console.log('addd');
      this.assignmentsChecked.push(assignment);
    } else {
      console.log('Deleete' + this.assignmentsChecked.indexOf(assignment));
      this.assignmentsChecked.splice(
        this.assignmentsChecked.indexOf(assignment),
        1
      );
    }
    console.log(this.assignmentsChecked);
  }
  containsObject(obj: Assignment, list: Assignment[]) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }

    return false;
  }

  checkAllAssignments() {
    if (this.checkAll == false) this.checkAll = true;
    else this.checkAll = false;
  }
  /// auth
  isAdmin() {
    return !this.authService.loggedIn;
  }

  initializeData() {
    this.isLoading=true;
    this.assignmentService.insertData().subscribe((message) => {
      console.log('ALL ASSIGNMENT ARE ADDED');
      window.location.reload();
      this.isLoading=false;
      // this.router.navigate(["/home"],{replaceUrl:true});
    });
  }
}

@Component({
  selector: 'dialog-overview-dialog',
  templateUrl: 'dialogDelete.html',
  styleUrls: ['./assignments.component.css'],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AssignmentsComponent,
    private assignmentsService: AssignmentsService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  assignment?: Assignment = this.data.toDeleteAssignment;
  onNoClick(): void {
    console.log('datat of dialog:' + this.data.toDeleteAssignment?.id);
    this.dialogRef.close();
  }
  onDeleteAssignment(assignment?: Assignment) {
    if (assignment)
      this.assignmentsService
        .deleteAssignment(assignment)
        .subscribe((response) => {
          console.log(response.message);
          this._snackBar.open(response.message, '', {
            duration: 2000,
            panelClass: ['red-snackbar'],
          });
          this.dialogRef.close();
        });
  }
}
@Component({
  selector: 'dialog-overview-dialog-all',
  templateUrl: 'dialogDeleteAll.html',
  styleUrls: ['./assignments.component.css'],
})
export class DialogOverviewExampleDialogAll implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogAll>,
    @Inject(MAT_DIALOG_DATA) public data: AssignmentsComponent,
    private assignmentsService: AssignmentsService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  delete:string="Delete "
  count: number =0;
  ngOnInit(): void {
       if (this.assignments)
    {this.count = this.assignments?.length;}
    throw new Error('Method not implemented.');
  }
  assignments?: Assignment[] = this.data.assignmentsChecked;
  onNoClick(): void {
    console.log('datat of dialog:' + this.data.toDeleteAssignment?.id);
    this.dialogRef.close();
  }
  onDeleteAssignment() {


    if (this.assignments)
    {this.count = this.assignments?.length;
          this.assignments?.forEach((assignment) => {
        this.assignmentsService.deleteAssignment(assignment).subscribe(
          (response) => {
            if(response){
                console.log('response=' + response.message);

         this.count--;
            if (this.count == 0){          this.dialogRef.close();} 
            }
          
            // this._snackBar.open(response.message, '', {
            //   duration: 2000,
            //   panelClass: ['red-snackbar'],
            // });
          },
          (err) => {
            console.log(err);
            //closeLoadingBar();
          },
          () => {
            //do whatever you want

            //closeLoadingBar()
          }
        );
      });
    }
  
  }
}