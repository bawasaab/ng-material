import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../excercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  public excercises!: Exercise[];

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.excercises = this.trainingService.getAvailbleExcecises();
  }

  onStartTraining( form: NgForm ) {
    this.trainingService.startExcercise( form.value.excercise );
  }
}
