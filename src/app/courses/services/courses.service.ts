import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Course } from '../model/course';
import { delay, first, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }
  // constructor(private http: HttpClient) { }

  list():Observable<Course[]>{
    return of([
      {_id: '1', name: 'Angular', category: 'Front-end'},
      {_id: '2', name: 'Spring Boot', category: 'Back-end'},
      {_id: '3', name: 'SQL', category: 'Database'},
    ]).pipe(first(),delay(2000));
  }
}
