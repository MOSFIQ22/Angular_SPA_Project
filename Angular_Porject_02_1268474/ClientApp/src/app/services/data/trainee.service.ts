import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Trainee } from 'src/app/models/data/trainee';
import { apiUrl } from 'src/app/models/shared/app-constants';
import { ImagePathResponse } from 'src/app/models/shared/image-path-response';
import {TraineeViewModels} from 'src/app/models/view-models/trainee-view-models';
import {TraineeInputModels} from 'src/app/models/view-models/Input/trainee-input-models';


@Injectable({
  providedIn: 'root'
})
export class TraineeService {
  update(data:TraineeInputModels):Observable<any>{
    return this.http.put<any>(`${apiUrl}/Trainees/${data.traineeID}/VM`, data);
  }
  delete(data: TraineeViewModels) {
    return this.http.delete<any>(`${apiUrl}/Trainees/${data.traineeID}`);
  }
  constructor(
    private http:HttpClient
  ) { }
  get():Observable<Trainee[]>{
    return this.http.get<Trainee[]>(`${apiUrl}/Trainees`);
  }
  getVM():Observable<TraineeViewModels[]>{
    return this.http.get<TraineeViewModels[]>(`${apiUrl}/Trainees/VM`);
  }
  getById(id:number):Observable<Trainee>{
    return this.http.get<Trainee>(`${apiUrl}/Trainees/${id}`);
  } 
  insert(data:TraineeInputModels):Observable<Trainee>{
    return this.http.post<Trainee>(`${apiUrl}/Trainees/VM`, data);
  } 
  uploadImage(id: number, f: File): Observable<ImagePathResponse> {
    const formData = new FormData();

    formData.append('picture', f);
    //console.log(f);
    return this.http.post<ImagePathResponse>(`${apiUrl}/Trainees/Upload/${id}`, formData);
  }
  
}

