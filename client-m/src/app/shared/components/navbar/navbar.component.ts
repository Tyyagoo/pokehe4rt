import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  @Input() links: string[] = ['None'];
  @Output() selected = new EventEmitter();
  activeItem = 0;
  constructor() {}

  ngOnInit(): void {
    this.selected.emit(this.links[this.activeItem]);
  }

  onSelect(item: string, index: number) {
    this.activeItem = index;
    this.selected.emit(item);
  }
}
