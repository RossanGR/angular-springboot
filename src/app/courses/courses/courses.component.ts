import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  // courses:Course[] = [
  //   {_id: '1', name: 'Angular', category: 'front-end'}
  // ];
  courses$:Observable<Course[]> = new Observable();
  displayedColumns = ['name', 'category'];

  constructor( private coursesService: CoursesService, private dialog: MatDialog){}

  ngOnInit(){
    this.courses$ = this.coursesService.list();
  }

  onError(errorMsg:string){
    this.dialog.open(ErrorDialogComponent,{
      data: errorMsg
    })
  }

}
