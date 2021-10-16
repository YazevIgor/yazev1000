import { Component, OnInit } from '@angular/core';

import { Student } from 'src/app/shared/interface/student.interface';
import { StudentListService } from 'src/app/shared/services/student-list.service';


@Component({
  selector: 'app-shop-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentListComponent implements OnInit {
  nameSortTurn = true
  quantitySortTurn = true
  studentList:Student[]  =  []
  sortSelected:keyof Student = "name"
  showAddingRow = false
  showEdited = false
  idEdited = 0
  addingInputs = {
    name:"",
    surname:"",
    phone:"",
    email:"",
    birthday:"",
    group:"",
    speciality:""
  }
  editedInputs = {
    name:"",
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
  sortBy(array:Student[], prop: keyof Student) {
    if(this.sortSelected == "name" || this.quantitySortTurn){
      if(this.nameSortTurn){
        return array.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
      }else{
        return array.sort((a, b) => a[prop] < b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
      }
    }else return 0
  }
  changeSortSelected(sort:keyof Student){
    this.sortSelected = sort
    if(sort=="name"){
      this.nameSortTurn = !this.nameSortTurn
    }else{
      this.quantitySortTurn = !this.quantitySortTurn
    }
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
  async endEdited(result:boolean) {
    try {
      let res = await this.listService.editStudent(this.studentList[this.idEdited])
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
