import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { ExamResult } from 'src/app/models/data/exam-result';
import { Result } from 'src/app/models/shared/app-constants';
import { ExamAndExamResultViewModel } from 'src/app/models/view-models/exam-and-exam-result-view-model';
import { ExamService } from 'src/app/services/data/exam.service';
import { NotifyService } from 'src/app/services/shared/notify.service';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent implements OnInit {
  exam:ExamAndExamResultViewModel = {};
  
  dataSource= new MatTableDataSource(this.exam.examResults
    );
  columns:string[] = ['trainee','result'];
  
    constructor(
      private examService:ExamService,
      private notifyService:NotifyService,
      private activatedRoute:ActivatedRoute
    ){}
    getResult(v:number):string{
      return Result[v];
    }
  ngOnInit(): void {
    this.exam.examResults=[];
    let id:number = this.activatedRoute.snapshot.params['id'];
    this.examService.getWithItems(id)
    .subscribe({
      next: r=>{
        this.exam= r;
        console.log(this.exam)
        this.dataSource.data=this.exam.examResults as ExamResult[];
      },
      error:err=>{
        this.notifyService.message('Failed to load ExamResult', 'DISMISS');
        throwError(()=> err);
      }
    });
  }
}