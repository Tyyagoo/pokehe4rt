import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from '../../models/entity';
import { TrainerService } from '../../services/trainer/trainer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData?: User;

  constructor(
    private userService: UserService,
    private trainerService: TrainerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let subscription = this.route.params.subscribe((params) => {
      let username = params.username;
      this.getProfileData(username);
    });
  }

  getProfileData(username: string) {
    this.userService.getUserData(
      username,
      (user) => {
        this.userData = user;
      },
      (err) => console.error(err)
    );
  }

  getViewerMode(): 'OWNER' | 'VIEWER' | 'NONE' {
    if (this.userData) {
      let myData = this.userService.getTokenData();
      return myData.username === this.userData.username ? 'OWNER' : 'VIEWER';
    }
    return 'NONE';
  }
}
