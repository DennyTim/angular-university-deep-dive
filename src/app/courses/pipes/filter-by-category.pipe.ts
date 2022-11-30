import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { Course } from '../../model/course';

@Pipe({
  name: 'filterByCategory',
  /** For no immutable data */
  // pure: false
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(courses: Course[], category: string): Course[] {
    return courses.filter((course: Course) => course.category === category);
  }
}
