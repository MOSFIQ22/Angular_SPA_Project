import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/models/data/exam';
import { apiUrl } from 'src/app/models/shared/app-constants';
import { ExamAndExamResultViewModel } from 'src/app/models/view-models/exam-and-exam-result-view-model';
import { ExamViewModels } from 'src/app/models/view-models/exam-view-models';


@Injectable({
  providedIn: 'root'
})
export class ExamService {
  getWithItems(id: number) {
    return this.http.get<ExamAndExamResultViewModel>(`${apiUrl}/Exams/${id}/OI`)
  }

  constructor(
    private http:HttpClient
  ) { }
   get():Observable<Exam[]>{
    return this.http.get<Exam[]>(`${apiUrl}/Exams`);
  } 
  getVM():Observable<ExamViewModels[]>{
    return this.http.get<ExamViewModels[]>(`${apiUrl}/Exams/VM`);
  } 
  getById(id:number):Observable<Exam>{
    return this.http.get<Exam>(`${apiUrl}/Exams/${id}`);
  } 
  insert(data:Exam):Observable<Exam>{
    console.log(data);
    return this.http.post<Exam>(`${apiUrl}/Exams`, data);
  } 
  update(data:Exam):Observable<any>{
    return this.http.put<any>(`${apiUrl}/ExamsContext/VM/${data.examID}`, data);
  } 
  delete(data: ExamViewModels) {
    return this.http.delete<any>(`${apiUrl}/Exams/${data.examID}`);
  }

}