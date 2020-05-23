import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearchatPage } from './crearchat.page';

const routes: Routes = [
  {
    path: '',
    component: CrearchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearchatPageRoutingModule {}
