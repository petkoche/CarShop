import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthGuard } from '.././auth/auth-guard.service';
import { UserSignupComponent } from './user-signup/user-signup.component';
import {UserCreateCarComponent} from './user-create-car/user-create-car.component';
import {UserCarRepairsComponent} from './user-car-repairs/user-car-repairs.component';
import {UserPublicComponent} from './user-public/user-public.component';
import {CarReviewComponent} from './car-review/car-review.component';


const routes: Routes = [

  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'signup', component: UserSignupComponent},
  { path: 'dashboard', component:  UserDashboardComponent, canActivate: [AuthGuard]} ,
  { path: 'repairs', component:  UserCarRepairsComponent, canActivate: [AuthGuard]} ,
  { path: 'dashboard/register-car', component:  UserCreateCarComponent, canActivate: [AuthGuard]},
  { path: 'all', component: UsersListComponent},
  { path: ':id', component: UserPublicComponent},
  { path: ':id/:licensePlate', component: CarReviewComponent},
];

@NgModule({
    imports: [RouterModule.forChild  (routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }
