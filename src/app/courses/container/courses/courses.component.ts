import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$:Observable<Course[]> = new Observable();
  displayedColumns = ['name', 'category','actions'];

  constructor( private coursesService: CoursesService, private dialog: MatDialog, private router: Router, private route:ActivatedRoute, private snackBar: MatSnackBar){
    this.refresh();
  }

  ngOnInit(){

  }

  onError(errorMsg:string){
    this.dialog.open(ErrorDialogComponent,{
      data: errorMsg
    })
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  refresh(){
    this.courses$ = this.coursesService.list().pipe(
      catchError(error => {
        this.onError(error.message);
        return of([]);
      })
    );
  }

  onEdit(course:Course){
    this.router.navigate(['edit', course._id], {relativeTo: this.route});
  }

  onDelete(course:Course){
    this.coursesService.remove(course._id).subscribe({
      next:()=>{ this.snackBar.open('Curso deletado com sucesso!','X', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.refresh();
    },
    error:error=>{this.onError(error)}
    });
  }

}
