import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { Course } from '../../model/course';
import { CourseImageComponent } from '../course-image/course-image.component';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: [ './course-card.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent implements OnChanges {

  @Input() course: Course;
  @Input() cardIndex: number;
  @Input() noImageTpl: TemplateRef<any>;
  @Output() courseSelected = new EventEmitter<Course>();

  @ContentChildren(CourseImageComponent, { read: ElementRef })
  images: QueryList<ElementRef>;

  constructor(@Attribute('type') private type: string) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changed = 'changed';
    this.course.description = `${ this.course.description } ${ changed }`;
    this.course.category = 'ADVANCED';
  }


  cardClasses(): { [key: string]: boolean } {
    return {
      beginner: this.course.category === 'BEGINNER',
    };
  }

  onTitleChanged(newTitle: string): void {
    this.course.description = newTitle;
  }

  onCourseUpdated(description: string): void {
    this.courseSelected.emit({ ...this.course, description });
  }

  [`isImageVisible`](): boolean {
    return !!(this.course && this.course.iconUrl);
  }

  /** For [ngStyle] example */
  [`cardStyles`](): { [key: string]: string } {
    return {
      'background-image': `url(${ this.course.iconUrl })`
    };
  }
}
