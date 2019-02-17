import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { EmployeesItemComponent } from './employees-item/employees-item.component';

@NgModule({
  declarations: [EmployeesTableComponent, EmployeesItemComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
