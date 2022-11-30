
import { TraineeService } from './../../../services/data/trainee.service';
import { ExamService } from 'src/app/services/data/exam.service';
import { ExamResult } from './../../../models/data/exam-result';
import { Trainee } from './../../../models/data/trainee';
import { Exam } from './../../../models/data/exam';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifyService } from 'src/app/services/shared/notify.service';
import { throwError } from 'rxjs';
import { Result } from 'src/app/models/shared/app-constants';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.css']
})
export class ExamCreateComponent implements OnInit {

  exam:Exam = { examName:undefined, examFee:undefined}
  
  trainee:Trainee[] =[];
 
  //
  examForm:FormGroup= new FormGroup({
    examName: new FormControl(undefined, Validators.required),
    examFee: new FormControl(undefined, Validators.required),
    examResults: new FormArray([])
  })
resultsOptions: {label:string, value:number}[]=[];
  constructor(
    private examService: ExamService,
    private traineeService:TraineeService,
    private notifyService:NotifyService
  ) { }
save(){
  if(this.examForm.invalid) return;
  //console.log(this.orderForm.value);
  Object.assign(this.exam, this.examForm.value);
  //console.log(this.order);
  this.examService.insert(this.exam)
  .subscribe({
    next:r=>{
      this.notifyService.message("Data saved", 'DISMISS');
    },
    error:err=>{
      this.notifyService.message("Failed to load Trainee", 'DISMISS');
      throwError(()=>err);
    }
  })
}
get examResultsFormArray(){
  return this.examForm.controls["examResults"] as FormArray;
}
addItem(){
  this.examResultsFormArray.push(new FormGroup({
    traineeID: new FormControl(undefined, Validators.required),
    result:new FormControl(undefined, Validators.required)
  }))
}
removeItem(index:number){
  if(this.examResultsFormArray.controls.length> 1)
    this.examResultsFormArray.removeAt(index);
}
  ngOnInit(): void {
    this.traineeService.get()
    .subscribe({
      next: r=>{
        this.trainee = r;
      },
      error: err=>{
        this.notifyService.message("Failed to load trainee", 'DISMISS');
      }
    });
    Object.keys(Result).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.resultsOptions.push({label: v, value:<any> Result[v]});
    });
    //console.log(this.statusOptions)
    this.addItem();
  }

}
