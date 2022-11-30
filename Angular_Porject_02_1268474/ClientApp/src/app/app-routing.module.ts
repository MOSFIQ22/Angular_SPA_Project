import { ExamCreateComponent } from './components/exam/exam-create/exam-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseCreateComponent } from './components/course/course-create/course-create.component';
import { CourseEditComponent } from './components/course/course-edit/course-edit.component';
import { CourseViewComponent } from './components/course/course-view/course-view.component';
import { ExamResultComponent } from './components/exam/exam-result/exam-result.component';

import { ExamViewComponent } from './components/exam/exam-view/exam-view.component';

import { HomeComponent } from './components/home/home.component';
import { TraineeCreateComponent } from './components/trainee/trainee-create/trainee-create.component';
import { TraineeEditComponent } from './components/trainee/trainee-edit/trainee-edit.component';
import { TraineeViewComponent } from './components/trainee/trainee-view/trainee-view.component';
import { ExamEditComponent } from './components/exam/exam-edit/exam-edit.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'courses', component:CourseViewComponent},
  {path:'course-create', component:CourseCreateComponent},
  {path:'course-edit/:id', component:CourseEditComponent},

  {path:'exams', component:ExamViewComponent},
  {path:'exam-results/:id', component:ExamResultComponent},
  {path:'exam-create', component:ExamCreateComponent},
  {path:'exam-edit/:id', component:ExamEditComponent},

  {path:'trainees', component:TraineeViewComponent},
  {path:'trainee-create', component:TraineeCreateComponent},
  {path:'trainee-edit/:id', component:TraineeEditComponent}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
