import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
  //List used to store all employees.
  employeeList: AngularFireList<any>;
  
  //Editable entity used for edition.
  selectedEmployee: Employee = new Employee();

  constructor(private firebase : AngularFireDatabase) { }

  getData() 
  { //Used to read from firebase. 
    this.employeeList = this.firebase.list('employees');
    return this.employeeList;
  }

  insertEmployee(employee : Employee) 
  { //Core function called to insert to firebase.
    this.employeeList.push({
      name : employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
  }

  updateEmployee(employee : Employee) 
  { //Core function called to edit on firebase.
    this.employeeList.update(employee.$key, 
    {
      name : employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
  }

  deleteEmployee ($key : string) 
  { //Core function called to delete from firebase.
    this.employeeList.remove($key);
  }

}
