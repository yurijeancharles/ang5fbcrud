import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  //List that will be used to add, delete and modify.
  employeeList : Employee[];

  constructor(private employeeService : EmployeeService, private toastr : ToastrService) { }

  ngOnInit() 
  {
    //Subscribe to the firebase database, read all data.
    var x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
      })
    });
  }

  onEdit(emp: Employee) 
  { //Is called when the edit icon is clicked.
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  onDelete(key : string)
  { //Is called when the delete icon is clicked.
    
    //Request user to confirm if he wants to delete employee.
    if (confirm("You are about to delete this employee. Are you sure you want to proceed?") == true) 
    {
      this.employeeService.deleteEmployee(key);
      this.toastr.warning("Deleted Successfully", "Employee Register");
    }
  }

}
