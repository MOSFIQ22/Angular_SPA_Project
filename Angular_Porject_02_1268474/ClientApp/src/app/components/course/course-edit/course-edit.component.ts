import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Course } from 'src/app/models/data/course';
import { CourseService } from 'src/app/services/data/course.service';
import { NotifyService } from 'src/app/services/shared/notify.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  course:Course = null!;
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
    private notifyService:NotifyService,
    private activatedRoute:ActivatedRoute
  ) { }
save(){
  if(this.courseForm.invalid) return;
      Object.assign(this.course, this.courseForm.value);
      //console.log(this.course);
      this.courseService.update(this.course)
      .subscribe({
        next:r=>{
          this.notifyService.message('Data saved', 'DISMISS');
        },
        error:err=> {
          this.notifyService.message('Failed to save data', 'DISMISS');
          throwError(()=>err);
        }
      })
}
  ngOnInit(): void {
    let id:number=this.activatedRoute.snapshot.params['id'];
    this.courseService.getById(id)
    .subscribe({
      next: r=> {
        this.course=r;
        //console.log(this.course);
        this.courseForm.patchValue(this.course);
      },
      error: err=>{
        this.notifyService.message('Failed to load customer data', 'DISMISS');
        throwError(()=>err);
      }
    })
  }

}
