import { CoursesService } from './../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit{
  form:FormGroup;

  constructor(private formBuilder:FormBuilder, private service:CoursesService, private snackBar: MatSnackBar, private location: Location, private activateRoute:ActivatedRoute) {
    this.form = this.formBuilder.group({
      _id: [''],
      name: [null, Validators.required],
      category: [null, Validators.required]
    })
  }
  ngOnInit(): void {
    const course:Course = this.activateRoute.snapshot.data['course'];
    if(course){
      this.form.setValue(course);
    }
  }

  onSubmit(){
    this.service.save(this.form.value).subscribe({
      next: course => {this.onSuccess(), this.location.back();},
      error: error => {this.onErrors()},
      complete: () => {}
    });
  }

  onCancel(){this.location.back();}

  private onSuccess(){
    this.snackBar.open('Curso salvo com sucesso!','',{duration:5000});
  }
  private onErrors(){
    this.snackBar.open('Erro ao salvar curso','',{duration:5000});
  }



}
