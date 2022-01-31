import { HttpClient } from '@angular/common/http';
import { unescapeIdentifier } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, pipe, tap } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { dbInitialAssignments } from './data';
// this means that we can inject this object in the constructor of the component where it will be used
@Injectable({
  providedIn: 'root',
})
// a service manage data
export class AssignmentsService {
  assignments: Assignment[] = [];
  // url = 'http://localhost:8010/api/assignments';
  url = 'https://my-first-angular-website-be.herokuapp.com/api/assignments';

  constructor(private http: HttpClient) {}
  // to send the list of assignments
  getAssignments(): Observable<Assignment[]> {
    // in case we are sending a request in the cloud and the server is send a request to the db so we don;t know how much time will it take
    // so we will not send the data but we will send an object "Observable"
    // observable function

    return this.http.get<Assignment[]>(this.url);
  }
  getAssignmentsPagination(page:number,limit:number): Observable<any> {

    // any because it returns an Object
    return this.http
      .get<any>(this.url + '?page=' + page + '&limit=' + limit)
      .pipe(
        map((_) => {
          console.log('hello', _);
          return _;
        }),
        catchError(this.handleError<any>('!!! ERROR CONNECTING TO THE SERVER'))
      );
  }

  addAssignment(assignment: Assignment): Observable<any> {
    //console.log("Adding an assignment through service ....")
    // console.log(assignment);
    return this.http.post(this.url, assignment);
    // this.assignments.push(assignment);
    // return of('The assignment is added successfully');
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    console.log(assignment);
    assignment.due=true;
    return this.http.put(this.url, assignment);
 
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete(this.url + '/' + assignment._id);
  }

  getAssignmentById(id: number): Observable<Assignment | undefined> {
    // let assignment = this.assignments.find((a) => a.id == id);
    return this.http.get<Assignment>(this.url + '/' + id).pipe(
      map((a) => {

        return a;
      }),
      catchError(
        this.handleError<any>(
          '### catcheError : getassignments by id avec id=' +
            id +
            " doesn't work"
        )
      )
    );

    // return of(assignment);
  }
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  insertData(): Observable<any> {
    const callAddAssignments: any = [];
    dbInitialAssignments.forEach((a) => {
      // console.log(a.dueDate )
      let newAssignment = new Assignment();
      newAssignment.id = a.id;
      newAssignment.name = a.name;
      newAssignment.dueDate = new Date(a.dueDate);
      newAssignment.due = a.due;

      callAddAssignments.push(this.addAssignment(newAssignment));
    });

    return forkJoin(callAddAssignments);
  }
  deleteAllAssignments() {
    this.getAssignments().subscribe((a) => {
      // console.log("########3"+a.message);
      a.forEach((element) => {
        this.deleteAssignment(element).subscribe((response) => {
          console.log(response.message);
        });
      });
    });
  }
}
