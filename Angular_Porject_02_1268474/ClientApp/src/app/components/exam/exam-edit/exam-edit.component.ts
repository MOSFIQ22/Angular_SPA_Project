import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Exam } from 'src/app/models/data/exam';
import { ExamResult } from 'src/app/models/data/exam-result';
import { Trainee } from 'src/app/models/data/trainee';
import { Result } from 'src/app/models/shared/app-constants';
import { ExamService } from 'src/app/services/data/exam.service';
import { TraineeService } from 'src/app/services/data/trainee.service';
import { NotifyService } from 'src/app/services/shared/notify.service';

@Component({
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.css']
})
export class ExamEditComponent implements OnInit {

  exam:Exam = {examName:undefined, examFee:undefined}
  
  trainee:Trainee[] =[];
  //
  resultsOptions:{label:string, value:number}[] =[];
  //
  examForm:FormGroup= new FormGroup({
    examName: new FormControl(undefined, Validators.required),
    examFee: new FormControl(undefined, Validators.required),
    examResults: new FormArray([])
    
  })
  constructor(
    private examService: ExamService,
    private traineeService:TraineeService,
    private notifyService:NotifyService,
    private activatedRout:ActivatedRoute
  ) { }
  get examResultsFormArray(){
    return this.examForm.controls["examResults"] as FormArray;
  }
  addItem(oi?:ExamResult){
    //console.log(this.addItem)
    if(oi){
      this.examResultsFormArray.push(new FormGroup({
        traineeID: new FormControl(oi.traineeID, Validators.required),
        result:new FormControl(oi.result)
      }))
    }
    else
    {
      this.examResultsFormArray.push(new FormGroup({
        traineeID: new FormControl(undefined, Validators.required),
        result:new FormControl(undefined)
      }));
    }
    
  }
  removeItem(index:number){
    if(this.examResultsFormArray.controls.length> 1)
      this.examResultsFormArray.removeAt(index);
  }
  save(){
    if(this.examForm.invalid) return;
    console.log(this.examForm.value);
    Object.assign(this.exam, this.examForm.value);
    console.log(this.exam);
    this.examService.update(this.exam)
    .subscribe({
      next:r=>{
        this.notifyService.message("Data saved", 'DISMISS');
      },
      error:err=>{
        this.notifyService.message("Failed to load exams", 'DISMISS');
        throwError(()=>err);
      }
    })
  }
  ngOnInit(): void {
    let id:number = this.activatedRout.snapshot.params['id'];
    this.examService.getWithItems(id)
    .subscribe({
      next:r=>{
        this.exam = r;
        console.log(this.exam);
        this.examForm.patchValue(this.exam);
        this.exam.examResults?.forEach(oi=>{
          this.addItem(oi);
        });
        console.log(this.examForm.value)
      },
      error:err=>{
        this.notifyService.message("Falied to load order", "DISMISS");
        throwError(()=>err);
      }
    });
    this.traineeService.get()
    .subscribe({
      next: r=>{
        this.trainee = r;
      },
      error: err=>{
        this.notifyService.message("Failed to load trainees", 'DISMISS');
      }
    });
    Object.keys(Result).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.resultsOptions.push({label: v, value:<any> Result[v]});
    });
  }
}

