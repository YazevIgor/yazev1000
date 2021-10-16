import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsListRoutingModule } from './students-list-routing.module';


import { ShopListLayoutComponent } from './shared/shop-list-layout/shop-list-layout.component';
import { StudentListComponent } from './pages/students-list/student-list.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShopListLayoutComponent,
    StudentListComponent,
    AddStudentComponent,
  ],
  imports: [
    CommonModule,
    StudentsListRoutingModule,
    FormsModule
  ]
})
export class StudentsListModule { }
