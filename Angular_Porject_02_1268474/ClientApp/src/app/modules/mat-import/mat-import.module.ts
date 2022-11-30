import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table'; 
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select'; 
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker'; 


const modules=[
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSelectModule,
  MatNativeDateModule,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports:[...modules]
})
export class MatImportModule { }
