import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from '../pages/Create/create.component';
// import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: '', redirectTo: '/create', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
