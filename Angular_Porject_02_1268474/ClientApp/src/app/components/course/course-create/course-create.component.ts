import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { Course } from 'src/app/models/data/course';
import { NotifyService } from 'src/app/services/shared/notify.service';
import { CourseService } from 'src/app/services/data/course.service';




@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  course:Course = {batchName:undefined, courseName:undefined, courseDesc:undefined,courseDuration:undefined,startDate:undefined,endDate:undefined,available:undefined};
  courseForm:FormGroup = new FormGroup({
    batchName: new FormControl(undefined, [Validators.required, Validators.maxLength(40)]),
    courseName:new FormControl(undefined, Validators.required),
    courseDesc:new FormControl(undefined, [Validators.required]),
    courseDuration: new FormControl(undefined, [Validators.required, Validators.maxLength(40)]),
    startDate:new FormControl(undefined, Validators.required),
    endDate:new FormControl(undefined, [Validators.required, ]),
    available:new FormControl(undefined, [Validators.required,])
  });
  constructor(
    private courseService:CourseService,
    private notifyService:NotifyService
  ) { }
    save():void{
      if(this.courseForm.invalid) return;
      Object.assign(this.course, this.courseForm.value);
      console.log(this.course);
      this.courseService.insert(this.course)
      .subscribe({
        next: r=>{
          this.notifyService.message('Data saved', 'DISMISS');
          this.course = {batchName:undefined, courseName:undefined, courseDesc:undefined,courseDuration:undefined,startDate:undefined,endDate:undefined,available:undefined};
          this.courseForm.patchValue(this.course);
          this.courseForm.markAsUntouched();
          this.courseForm.markAsPristine();
          
        },
        error:err=> {
          this.notifyService.message('Failed to save data', 'DISMISS');
          throwError(()=>err);
        }
      })
    }
  ngOnInit(): void {
  }

}
