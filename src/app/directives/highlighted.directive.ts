import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';

@Directive({
  selector: '[highlighted]',
  exportAs: 'hl'
})
export class HighlightedDirective {
  @Input('highlighted') isHighlighted = false;
  @Output() toggleHighlight = new EventEmitter();

  constructor() {
    console.log('Directive created...');
  }

  @HostBinding('class.highlighted')
  get cssClasses(): boolean {
    return this.isHighlighted;
  }

  @HostBinding('attr.disabled')
  get disabled(): string {
    return 'true';
  }

  @HostListener('mouseover', ['$event'])
  mouseOver($event): void {
    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  @HostListener('mouseleave', ['$event'])
  mouseLeave(): void {
    this.isHighlighted = false;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  toggle(): void {
    this.isHighlighted = !this.isHighlighted;
    this.toggleHighlight.emit(this.isHighlighted);
  }
}
