import { unescapeIdentifier } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
// this means that we can inject this object in the constructor of the component where it will be used
@Injectable({
  providedIn: 'root'
})
// a service manage data 
export class AssignmentsService {
  assignments: Assignment[] = [
    {
      id:1,
      name: 'Devoir Angular 1',
      dueDate: new Date('2022-01-23'),
      due: false,
    },
    {
      id:2,
      name: 'Devoir Angular 2',
      dueDate: new Date('2022-01-23'),
      due: false,
    },
    {
      id:3,
      name: 'Devoir Angular 3',
      dueDate: new Date('2022-01-23'),
      due: true,
    },
  ];
  
  constructor() { }
  // to send the list of assignments
  getAssignments():Observable<Assignment[]>{
    // in case we are sending a request in the cloud and the server is send a request to the db so we don;t know how much time will it take 
    // so we will not send the data but we will send an object "Observable"
    // observable function
    return of(this.assignments);
  }
  addAssignment(assignment:Assignment):Observable<string>{
    console.log("Adding an assignment through service ....")
    this.assignments.push(assignment);
    return of("The assignment is added successfully");
  }

  updateAssignment(assignment:Assignment):Observable<string>{
    console.log("updating an assignment through service ....")
    // assignment.name=
    assignment.due = true;
    return of("the assignment has been updated successfully");
  }

  deleteAssignment(assignment:Assignment):Observable<String>{
    console.log("Deleting an assignment through service ....")
    this.assignments.splice(this.assignments.indexOf(assignment),1);
    return of("The assignment has been deleted successfully!!");
  }

  getAssignmentById(id:number):Observable<Assignment|undefined>{
    let assignment = this.assignments.find(a => a.id == id)

    return of(assignment);

  }


  updateAssignmentData(assignment:Assignment):Observable<string>{
    console.log("The assignment data has been updated");

    return of("The assignment data has been updated");
  }
}
