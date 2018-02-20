import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService : EmployeeService,
  private toastr : ToastrService ) { }

  ngOnInit() {
    this.resetForm();
  }

  
  onSubmit(employeeForm : NgForm)
  {    //Called on form submit.

    //Determine if it is an insert operation or an update operation.
    if (employeeForm.value.$key == null)
    {
      this.employeeService.insertEmployee(employeeForm.value);
    }
    else
    {
      this.employeeService.updateEmployee(employeeForm.value);
    }
    
    //Refreshes form and delivers a notification.
    this.resetForm(employeeForm);
    this.toastr.success('Submitted Successfully', 'Employee Register');
  }

  resetForm(employeeForm? : NgForm)
  { //Called on button "Reset" is pushed.
    
    //If there's something still on the form, we clear it.
    if (employeeForm != null)
      employeeForm.reset();
      
    //Unselect the currently selected employee
    this.employeeService.selectedEmployee = {
        $key : null,
        name : "",
        position : "",
        office : "",
        salary : 0
      }


  }

}
