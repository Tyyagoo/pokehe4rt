import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  username: string = '';
  constructor(
    private router: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((map) => {
      this.username = map.username;
    });
  }
}
