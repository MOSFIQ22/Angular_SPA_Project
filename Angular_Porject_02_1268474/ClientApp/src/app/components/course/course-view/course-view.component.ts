import { Component, OnInit, ViewChild } from '@angular/core';
import { throwError } from 'rxjs';
import { Course} from 'src/app/models/data/course';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from 'src/app/services/data/course.service';
import { NotifyService } from 'src/app/services/shared/notify.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CourseViewModels } from 'src/app/models/view-models/course-view-models';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {

  course:CourseViewModels[] = [];
  columns:string[] =['batchName', 'courseName', 'courseDesc','courseDuration','startDate', 'endDate', 'available','actions'];
  dataSource:MatTableDataSource<Course> = new MatTableDataSource(this.course);
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  constructor(
    private courseService:CourseService,
    private notifyService: NotifyService,
    private matDialog:MatDialog
  ) { }
  confirmDelete(data:CourseViewModels){
    //console.log(data);
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '500ms'
    }).afterClosed()
    .subscribe(result=>{
      //console.log(result);
      if(result){
        this.courseService.delete(data)
        .subscribe({
          next: r=>{
            this.notifyService.message('Customer removed', 'DISMISS');
            this.dataSource.data = this.dataSource.data.filter(c => c.courseID != data.courseID);
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
    this.courseService.getVM().subscribe({
      next: r=>{
        this.course = r;
        //console.log(this.course);
        this.dataSource.data = this.course;
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
