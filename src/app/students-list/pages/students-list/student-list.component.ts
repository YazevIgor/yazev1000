import { Component, OnInit } from '@angular/core';

import { Student } from 'src/app/shared/interface/student.interface';
import { StudentListService } from 'src/app/shared/services/student-list.service';
import {FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-shop-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentList:Student[]  =  []
  showAddingRow = false
  showEdited = false
  idEdited = 1
  personalForm!: FormGroup;
  addingInputs = {
    name: "",
    surname:"",
    phone:"",
    email:"",
    birthday:"",
    group:"",
    speciality:""
  }
  constructor(private listService:StudentListService) { }
  async getStudentList(){
    try{
        this.studentList = await this.listService.getStudents()
    }catch(error){
      console.log(error)
    }finally{
      console.log(this.studentList);
    }
  }
  sortBy(array: Student[]) {
    this.studentList = array.sort((x,y) => {
      if (x.surname < y.surname) return - 1
      if (x.surname > y.surname) return 1
      return 0
    });
    console.log(this.studentList)
  }

  startAdding(){
    this.showAddingRow = true
    console.log('asd')
  }
  startEdited(id: number){
    this.showEdited = !this.showEdited
    this.idEdited = id - 1;
  }

  async deleteRow(id:number){
    try{
      await this.listService.deleteStudent(id)
    }catch(error){
      console.log(error);

    }finally{
      await this.getStudentList()
    }
  }
  async endEdited() {
    try {
      await this.listService.editStudent(this.studentList[this.idEdited])
      this.showEdited = false;
      await this.getStudentList()
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Edited");
    }
  }


  async endAdding(result:boolean){
    this.showAddingRow = false
    if(result){
      let newStudent:any = {
        name:this.addingInputs.name,
        surname:this.addingInputs.surname,
        phone:this.addingInputs.phone,
        email:this.addingInputs.email,
        birthday:this.addingInputs.birthday,
        group:this.addingInputs.group,
        speciality:this.addingInputs.speciality
      }
      await this.listService.postStudent(newStudent)
      await this.getStudentList()
    }
      this.addingInputs.name = ""
      this.addingInputs.surname = ""
      this.addingInputs.phone = ""
      this.addingInputs.email = ""
      this.addingInputs.birthday = ""
      this.addingInputs.group = ""
      this.addingInputs.speciality = ""
  }
  ngOnInit(): void {
    this.getStudentList()


  }

}
