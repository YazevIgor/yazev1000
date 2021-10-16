import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path:"",
    component:MainComponent
  },
  {
    path:"studentList",
    loadChildren: ()=>import('./students-list/students-list.module').then(mod=>mod.StudentsListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
