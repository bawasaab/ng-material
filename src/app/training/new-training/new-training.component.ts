import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Exercise } from '../excercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>();
  public excercises!: Exercise[];

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.excercises = this.trainingService.getAvailbleExcecises();
  }

  onStartTraining() {
    this.trainingStart.emit();
  }
}
