import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../interface/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentListService {

  constructor(private http: HttpClient) {}
  StudentRoute = "http://localhost:3000/students/"
  getStudents(): Promise<Student[]>{
    return this.http.get<Student[]>(this.StudentRoute).toPromise()
  }
  getStudent(id:number): Promise<Student>{
    return this.http.get<Student>(this.StudentRoute+id).toPromise()
  }
  postStudent(data:Student): Promise<Student>{
    return this.http.post<Student>(this.StudentRoute,data).toPromise()
  }

  deleteStudent(id:number): Promise<Student>{
    return this.http.delete<Student>(this.StudentRoute+id).toPromise()
  }

  editStudent(data:Student): Promise<Student>{
    return this.http.patch<Student>(this.StudentRoute+data.id,data).toPromise()
  }
}
