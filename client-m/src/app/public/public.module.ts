import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';

@NgModule({
  declarations: [PublicComponent],
  imports: [SharedModule, PublicRoutingModule],
})
export class PublicModule {}
