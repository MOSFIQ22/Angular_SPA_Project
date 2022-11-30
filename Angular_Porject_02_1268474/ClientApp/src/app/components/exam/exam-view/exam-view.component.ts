import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { Exam } from 'src/app/models/data/exam';
import { ExamViewModels } from 'src/app/models/view-models/exam-view-models';
import { ExamService } from 'src/app/services/data/exam.service';
import { NotifyService } from 'src/app/services/shared/notify.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-exam-view',
  templateUrl: './exam-view.component.html',
  styleUrls: ['./exam-view.component.css']
})
export class ExamViewComponent implements OnInit {

  exam:ExamViewModels[] = [];
  columns:string[] =['examName','examFee','details','actions'];
  dataSource:MatTableDataSource<Exam> = new MatTableDataSource(this.exam);
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  constructor(
    private examService:ExamService,
    private notifyService: NotifyService,
    private matDialog:MatDialog
  ) { }
  confirmDelete(data:ExamViewModels){
    //console.log(data);
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '500ms'
    }).afterClosed()
    .subscribe(result=>{
      //console.log(result);
      if(result){
        this.examService.delete(data)
        .subscribe({
          next: r=>{
            this.notifyService.message('Exam removed', 'DISMISS');
            this.dataSource.data = this.dataSource.data.filter(c => c.examID != data.examID);
          },
          error:err=>{
            this.notifyService.message('Failed to delete data', 'DISMISS');
            throwError(()=>err);
          }
        })
      }
    })
  }
  ngOnInit(): void {
    this.examService.getVM().subscribe({
      next: r=>{
        this.exam = r;
        //console.log(this.course);
        this.dataSource.data = this.exam;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        this.notifyService.message("Failed to load course", "DISMISS");
        throwError(()=>err)
      }
    });
  }

}