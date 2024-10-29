import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Course } from '../model/course';
import { delay, first, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API = '/api/courses';

  // constructor() { }
  constructor(private http: HttpClient) { }

  list():Observable<Course[]>{
    return this.http.get<Course[]>(this.API);
  }

  findById(id:string){
    return this.http.get<Course>(`${this.API}/${id}`);
  }

  save(record:Partial<Course>):Observable<Course>{
    if(record._id){
      return this.update(record);
    }
     return this.create(record);
  }

  private create(record:Partial<Course>):Observable<Course>{
    return this.http.post<Course>(this.API,record);
  }

  private update(record:Partial<Course>):Observable<Course>{
    return this.http.put<Course>(`${this.API}/${record._id}`,record);
  }
  remove(id:string):Observable<Course>{
    return this.http.delete<Course>(`${this.API}/${id}`);
  }
}
