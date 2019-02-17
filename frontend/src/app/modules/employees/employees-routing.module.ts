import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeesTableComponent} from './employees-table/employees-table.component';

const routes: Routes = [
    { path: '', component: EmployeesTableComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
