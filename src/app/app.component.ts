import {
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Injector,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course } from './model/course';
import { CourseCardComponent } from './courses/course-card/course-card.component';
import { HighlightedDirective } from './directives/highlighted.directive';
import { CoursesService } from './services/courses.service';
import {
  AppConfig,
  CONFIG_TOKEN
} from '../config';
import { COURSES } from '../db-data';
import { createCustomElement } from '@angular/elements';
import { CourseTitleComponent } from './course-title/course-title.component';

function coursesServiceProvider(http: HttpClient): CoursesService {
  return new CoursesService(http);
}

const COURSES_SERVICES = new InjectionToken<CoursesService>('COURSES_SERVICES');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [
    {
      provide: COURSES_SERVICES,
      useFactory: coursesServiceProvider,
      deps: [ HttpClient ]
    }
  ]
})
export class AppComponent implements OnInit {
  courses$: Observable<Course[]>;
  coursesTotal = COURSES.length;

  @ViewChild(CourseCardComponent, { read: HighlightedDirective })
  highlighted: HighlightedDirective;

  @ViewChildren(CourseCardComponent, { read: ElementRef })
  cards: QueryList<ElementRef>;

  constructor(
    @Inject(COURSES_SERVICES) private coursesService: CoursesService,
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    private injector: Injector
  ) {
  }

  ngOnInit(): void {
    const htmlElement = createCustomElement(
      CourseTitleComponent,
      { injector: this.injector }
    );

    customElements.define('course-title', htmlElement);

    this.courses$ = this.coursesService.loadCourses();
  }

  save(course: Course): void {
    this.coursesService.saveCourse(course)
        .subscribe((data) => console.log('updated', data));
  }

  onToggle(isHighLighted: boolean): void {
  }
}
