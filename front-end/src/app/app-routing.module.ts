import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { CreateIndComponent } from './components/create-ind/create-ind.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditIndComponent } from './components/edit-ind/edit-ind.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  {
    path: 'individual/:id',
    component: DetailComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-register', component: AdminRegisterComponent },
  {
    path: 'create-individual',
    component: CreateIndComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'individual/:id/edit',
    component: EditIndComponent,
    canActivate: [AuthGuard],
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
