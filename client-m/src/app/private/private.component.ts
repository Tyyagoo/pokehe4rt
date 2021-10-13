import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../core/services/storage/storage.service';
import { TokenService } from '../core/services/token/token.service';
import { Trainer } from './models/entity';
import { TrainerCreatePayload } from './models/http';
import { TrainerService } from './services/trainer/trainer.service';
@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent implements OnInit {
  trainers: Trainer[] = [];

  constructor(
    private trainerService: TrainerService,
    private storageService: StorageService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.trainerService
      .fetchTrainers()
      .subscribe((res) => (this.trainers = res.data));
  }

  goToProfile() {
    let maybeUsername = this.storageService.get('username');
    if (maybeUsername !== null) {
      this.router.navigate([this.router.url, 'profile', maybeUsername]);
    } else {
      this.tokenService.clear();
      this.router.navigateByUrl('/');
    }
  }
}
