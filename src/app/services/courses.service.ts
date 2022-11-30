import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { pluck } from 'rxjs/operators';

@Injectable()
export class CoursesService {

  constructor(private http: HttpClient) {
  }

  loadCourses(): Observable<Course[]> {
    const params = new HttpParams()
      .set('page', '1')
      .set('pageSize', '10');

    return this.http.get<Course[]>('/api/courses', { params })
               .pipe(pluck('payload'));
  }

  saveCourse(course: Course): Observable<void>  {
    const headers = new HttpHeaders()
      .set('X-Auth', 'userId');
    return this.http.put<void>(`/api/courses/${ course.id }`, course, { headers });
  }
}
