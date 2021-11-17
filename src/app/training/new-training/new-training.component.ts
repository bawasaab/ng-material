import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../excercise.model';
import { TrainingService } from '../training.service';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  public excercises!: Exercise[];
  public item$!: Observable<Exercise[]>;

  constructor(
    private trainingService: TrainingService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.excercises = this.trainingService.getAvailbleExcecises();
  }

  onStartTraining( form: NgForm ) {
    this.trainingService.startExcercise( form.value.excercise );
  }
}
