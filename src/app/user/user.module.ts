import { SharedModule } from './../shared/shared.module';
import { UserService } from './user.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserCarComponent } from './user-car/user-car.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserCreateCarComponent } from './user-create-car/user-create-car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule  // Add this!
  ],

  declarations: [UserDashboardComponent, UserCarComponent, UsersListComponent, UserCreateCarComponent, UserSignupComponent],
  providers: []
})
export class UserModule { }
