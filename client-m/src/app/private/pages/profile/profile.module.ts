import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { OwnerComponent } from './owner/owner.component';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [ProfileComponent, OwnerComponent, ViewerComponent],
  imports: [SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}
