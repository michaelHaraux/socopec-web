import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AGENTComponent } from './agent/agent.component';

const routes: Routes = [
  { path: 'agents', component: AGENTComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
