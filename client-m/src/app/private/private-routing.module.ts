import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { PrivateComponent } from './private.component';

const routes: Routes = [
  { path: 'profile/:username', component: ProfileComponent },
  { path: '', component: PrivateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
