import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { CurrentTrainingComponent } from 'src/app/training/current-training/current-training.component';
import { StopTrainingComponent } from 'src/app/training/current-training/stop-training.component';
import { NewTrainingComponent } from 'src/app/training/new-training/new-training.component';
import { PastTrainingComponent } from 'src/app/training/past-training/past-training.component';
import { TrainingComponent } from 'src/app/training/training.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrainingModule { }
