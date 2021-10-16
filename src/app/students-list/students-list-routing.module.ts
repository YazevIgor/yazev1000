import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './pages/students-list/student-list.component';
import { ShopListLayoutComponent } from './shared/shop-list-layout/shop-list-layout.component';

const routes: Routes = [
  {
    path:"",
    component:ShopListLayoutComponent,
    children:[
      {
        path:"",
        component:StudentListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsListRoutingModule { }
