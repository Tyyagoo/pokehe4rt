import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, AfterViewInit, OnDestroy {
  private mediaSub?: Subscription;
  constructor(
    private cdRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver
  ) {}

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.asObservable().subscribe((changes) => {
      changes.forEach((c) => console.log(c.mqAlias));
    });
  }

  ngAfterViewInit(): void {
    return;
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.mediaSub?.unsubscribe();
  }
}
