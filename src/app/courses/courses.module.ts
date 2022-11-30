import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from './course-card/course-card.component';
import { HighlightedDirective } from '../directives/highlighted.directive';
import { NgxUnlessDirective } from '../directives/ngx-unless.directive';
import { CourseImageComponent } from './course-image/course-image.component';
import { FilterByCategoryPipe } from './pipes/filter-by-category.pipe';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    HighlightedDirective,
    NgxUnlessDirective,
    CourseCardComponent,
    CourseImageComponent,
    FilterByCategoryPipe
  ],
  exports: [
    HighlightedDirective,
    NgxUnlessDirective,
    CourseCardComponent,
    CourseImageComponent,
    FilterByCategoryPipe
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CoursesModule {
}
