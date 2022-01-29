import { HttpClient } from '@angular/common/http';
import { unescapeIdentifier } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, pipe, tap } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
// this means that we can inject this object in the constructor of the component where it will be used
@Injectable({
  providedIn: 'root',
})
// a service manage data
export class AssignmentsService {
  assignments: Assignment[] = [];
  url ="http://localhost:8010/api/assignments";
  constructor(private http:HttpClient) {}
  // to send the list of assignments
  getAssignments(): Observable<Assignment[]> {
    // in case we are sending a request in the cloud and the server is send a request to the db so we don;t know how much time will it take
    // so we will not send the data but we will send an object "Observable"
    // observable function
      

  return  this.http.get<Assignment[]>(this.url).pipe(map(_ => { console.log("hello",_); return _;}) ,catchError(this.handleError<any>("!!! you can't get all the daata"))) 

  }
  addAssignment(assignment: Assignment): Observable<any> {
    //console.log("Adding an assignment through service ....")
// console.log(assignment);
    return this.http.post(this.url,assignment);
  // this.assignments.push(assignment);
    // return of('The assignment is added successfully');
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    //console.log("updating an assignment through service ....")
    // assignment.name=
// console.log("---------------------"+assignment);
    return this.http.put(this.url,assignment);
    // assignment.due = true;
    // return of('the assignment has been updated successfully');
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    //console.log("Deleting an assignment through service ....")
    // this.assignments.splice(this.assignments.indexOf(assignment), 1);
    return this.http.delete(this.url + "/"+ assignment._id);
    // return of('The assignment has been deleted successfully!!');
  }

  getAssignmentById(id: number): Observable<Assignment | undefined> {
    // let assignment = this.assignments.find((a) => a.id == id);
    return this.http.get<Assignment>(this.url+"/"+id)
    .pipe(map (a => {
        a.name +=" passed by pipe";
        return a;
      }),
      catchError(this.handleError<any>('### catcheError : getassignments by id avec id='+id+" doesn't work"))
    );

    // return of(assignment);
  }
private handleError<T>(operation: any, result?: T) {
   return (error: any): Observable<T> => {
     console.log(error); // pour afficher dans la console
     console.log(operation + ' a échoué ' + error.message);

     return of(result as T);
   }
};

  // updateAssignmentData(assignment: Assignment): Observable<string> {
  //   //console.log("The assignment data has been updated");

  //   return of('The assignment data has been updated');
  // }
}
