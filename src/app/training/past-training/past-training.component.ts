import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Exercise } from "../excercise.model";
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = [
    'date',
    'name',
    'duration',
    'calories',
    'state'
  ];

  dataSource = new MatTableDataSource<Exercise>();

  constructor(
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {

    this.dataSource.data = this.trainingService.getCompletedOrCancelledExcercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
