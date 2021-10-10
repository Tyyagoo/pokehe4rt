import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';

@NgModule({
  declarations: [PrivateComponent],
  imports: [SharedModule, PrivateRoutingModule],
})
export class PrivateModule {}
