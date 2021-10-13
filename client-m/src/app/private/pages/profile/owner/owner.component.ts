import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/private/models/entity';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
})
export class OwnerComponent implements OnInit {
  @Input() user?: User;
  constructor() {}

  ngOnInit(): void {}

  getFirstTrainers(amount: number) {
    let trainers = new Array(amount).fill(null);
    return trainers;
  }

  openCreateTrainerModal() {}
}
