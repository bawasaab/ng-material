import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  onGoingTraining = false;
  excerciseSubscription!: Subscription;

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.excerciseSubscription = this.trainingService.excerciseChanges$.subscribe( (excercise) => {
      if( excercise ) {
        this.onGoingTraining = true;
      } else {
        this.onGoingTraining = false;
      }
    } );
  }

}
