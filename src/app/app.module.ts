import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopTrainingComponent } from "./training/current-training/stop-training.component";
import { AuthService } from './auth/auth.service';

import { AuthGaurd } from './auth/auth.gaurd';
import { AuthModule } from './feature-modules/auth/auth.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { TrainingModule } from './feature-modules/training/training.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    TrainingModule,

    CommonModule,
    MaterialModule,
    SharedModule
  ],
  providers: [AuthService, AuthGaurd],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent]
})
export class AppModule { }
