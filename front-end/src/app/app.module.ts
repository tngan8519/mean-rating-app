import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { EachComponent } from './components/each/each.component';
import { FormRatingComponent } from './components/form-rating/form-rating.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StarsRateComponent } from './components/stars-rate/stars-rate.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { CreateIndComponent } from './components/create-ind/create-ind.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditIndComponent } from './components/edit-ind/edit-ind.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    EachComponent,
    FormRatingComponent,
    NavbarComponent,
    StarsRateComponent,
    AdminRegisterComponent,
    CreateIndComponent,
    DetailComponent,
    EditIndComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
