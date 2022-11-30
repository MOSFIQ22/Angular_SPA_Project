import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/common/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CourseService } from './services/data/course.service';
import { MatImportModule } from './modules/mat-import/mat-import.module';
import { CourseViewComponent } from './components/course/course-view/course-view.component';
import { NotifyService } from './services/shared/notify.service';
import { CourseCreateComponent } from './components/course/course-create/course-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { TraineeService } from './services/data/trainee.service';
import { TraineeViewComponent } from './components/trainee/trainee-view/trainee-view.component';
import { DatePipe } from '@angular/common';
import { CourseEditComponent } from './components/course/course-edit/course-edit.component';
import { TraineeCreateComponent } from './components/trainee/trainee-create/trainee-create.component';
import { ExamViewComponent } from './components/exam/exam-view/exam-view.component';



import { ExamService } from './services/data/exam.service';
import { TraineeEditComponent } from './components/trainee/trainee-edit/trainee-edit.component';
import { ExamResultComponent } from './components/exam/exam-result/exam-result.component';
import { ExamCreateComponent } from './components/exam/exam-create/exam-create.component';
import { ExamEditComponent } from './components/exam/exam-edit/exam-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ConfirmDialogComponent,
    HomeComponent,
    CourseViewComponent,
    CourseCreateComponent,
    TraineeViewComponent,
    CourseEditComponent,
    TraineeCreateComponent,
    ExamViewComponent,
    ExamResultComponent,
    TraineeEditComponent,
    ExamCreateComponent,
    ExamEditComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatImportModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    DatePipe
  ],
  entryComponents:[ConfirmDialogComponent,],
  providers: [HttpClient, CourseService, NotifyService, TraineeService, ExamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
