import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';

@NgModule({
  declarations: [PrivateComponent, ProfileComponent],
  imports: [SharedModule, PrivateRoutingModule],
})
export class PrivateModule {}
