import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Course } from 'src/app/models/data/course';
import { Trainee } from 'src/app/models/data/trainee';
import { baseUrl } from 'src/app/models/shared/app-constants';
import { TraineeInputModels } from 'src/app/models/view-models/Input/trainee-input-models';
import { CourseService } from 'src/app/services/data/course.service';
import { TraineeService } from 'src/app/services/data/trainee.service';
import { NotifyService } from 'src/app/services/shared/notify.service';

@Component({
  selector: 'app-trainee-edit',
  templateUrl: './trainee-edit.component.html',
  styleUrls: ['./trainee-edit.component.css']
})
export class TraineeEditComponent implements OnInit {

  trainee:Trainee= null!;
  imgPath:string= baseUrl;
  course:Course[] = [];
  traineeForm:FormGroup= new FormGroup({
    courseID: new FormControl(undefined, Validators.required),
    traineeName: new FormControl(undefined, Validators.required),
    traineeAddress: new FormControl(undefined, Validators.required),
    email:new FormControl(undefined, Validators.required),
    birthDate:new FormControl(undefined, Validators.required),
    isRunning:new FormControl(undefined),
    picture: new FormControl(undefined, Validators.required)
    });
  
    file: File = null!;
    constructor(
      private traineeService: TraineeService,
      private courseService:CourseService,
      private notifyService:NotifyService,
      private activatedRoute:ActivatedRoute 

    ){}
    handleFileInputChange(event: any): void {
      if (event.target.files.length) {
        this.file = event.target.files[0];
        this.traineeForm.controls['picture'].patchValue(this.file.name);
      }
      else {
        this.traineeForm.controls['picture'].patchValue("");
      }
      
    }
    save(){
      if(this.traineeForm.invalid) return;
      let _self = this;
       Object.assign(this.trainee, this.traineeForm.value);
       console.log(this.trainee);
       let data:TraineeInputModels = {traineeID:this.trainee.traineeID, traineeName: this.trainee.traineeName,traineeAddress: this.trainee.traineeAddress, birthDate:this.trainee.birthDate,email:this.trainee.email,  
        courseID:this.trainee.courseID};
       this.traineeService.update(data)
       .subscribe({
        next: r=>{
          this.notifyService.message("Trainee  updated", "DISMISS");
          if(this.file){
           _self. updateImage();
          }
        }
       })
    }
    updateImage(){
      let _self = this;
      var reader = new FileReader();
          
          reader.onload = function (e: any) {
           _self.traineeService.uploadImage(<number>_self.trainee.traineeID, _self.file)
           .subscribe({
            next:r=>{
              _self.notifyService.message("Picture updated", "DISMISS");
            },
            error: err=>{
              _self.notifyService.message("Picture update failed", "DISMISS");
              throwError(()=>err);
            }
           })
          }
          reader.readAsArrayBuffer(_self.file);
    }
  ngOnInit(): void {
    let id:number = this.activatedRoute.snapshot.params['id'];
    this.traineeService.getById(id)
    .subscribe({
      next: r=>{
        this.trainee=r;
        this.traineeForm.patchValue(this.trainee)
        console.log(this.trainee)
      },
      error: err=> {
        this.notifyService.message('Failed to load tourist data', 'DISMISS')
        throwError(()=>err);
      } 
    });

    this.courseService.get()
    .subscribe({
      next: r=>{
        this.course = r;
      },
      error: err=>{
        this.notifyService.message("Failed to load trainees", 'DISMISS');
      }
    });
  }
}
