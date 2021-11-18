import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CurrentTrainingComponent } from 'src/app/training/current-training/current-training.component';
import { StopTrainingComponent } from 'src/app/training/current-training/stop-training.component';
import { NewTrainingComponent } from 'src/app/training/new-training/new-training.component';
import { PastTrainingComponent } from 'src/app/training/past-training/past-training.component';
import { TrainingComponent } from 'src/app/training/training.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrainingModule { }
