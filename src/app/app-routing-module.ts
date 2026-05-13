import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register';
import { UserListComponent } from './features/users/user-list/user-list';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UserListComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }