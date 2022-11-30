import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/data/course';
import { Trainee } from 'src/app/models/data/trainee';
import { CourseService } from 'src/app/services/data/course.service';
import { TraineeService } from 'src/app/services/data/trainee.service';
import { NotifyService } from 'src/app/services/shared/notify.service';

@Component({
  selector: 'app-trainee-create',
  templateUrl: './trainee-create.component.html',
  styleUrls: ['./trainee-create.component.css']
})
export class TraineeCreateComponent implements OnInit {
  trainee:Trainee = {courseID:undefined, traineeName:undefined, traineeAddress:undefined, birthDate:undefined, email:undefined, isRunning:undefined}
  course:Course[] = [];
  traineeForm:FormGroup= new FormGroup({
    courseID: new FormControl(undefined, Validators.required),
    traineeName: new FormControl(undefined, Validators.required),
    traineeAddress: new FormControl(undefined, Validators.required),
    email:new FormControl(undefined, Validators.required),
    birthDate:new FormControl(undefined, Validators.required),
    isRunning:new FormControl(undefined, Validators.required),
    picture: new FormControl(undefined, Validators.required),
    examResults: new FormArray([])
  });
  save() {
    if (this.traineeForm.invalid) return;
    Object.assign(this.trainee, this.traineeForm.value)
    console.log(this.trainee);
    var _self = this;
  
    this.traineeService.insert(this.trainee)
    .subscribe({
      next: r => {
        _self.notifyService.message('Data saved', 'DISMISS');
        var file = this.traineeForm.controls['picture'].value.files[0];
        var reader = new FileReader();
        
        reader.onload = function (e: any) {
          console.log(e);
          _self.traineeService.uploadImage(<number>r.traineeID, file)
            .subscribe({
              next: r => {
                _self.notifyService.message('Picture uploaded', 'DISMISS');
              },
              error: err => {
                _self.notifyService.message('Picture upload failed', 'DISMISS');
              }
            });
        }
        reader.readAsArrayBuffer(file);
      },
      error: err => {
      _self.notifyService.message('Failed to save product', 'DISMISS')
      }
    });
  }
  constructor(
    private traineeService: TraineeService,
    private courseService:CourseService,
    private notifyService:NotifyService
  ) { }
  ngOnInit(): void {
    this.courseService.get()
    .subscribe({
      next: r=>{
        this.course = r;
      },
      error: err=>{
        this.notifyService.message("Failed to load customers", 'DISMISS');
      }
    });
   
  }

}


  
