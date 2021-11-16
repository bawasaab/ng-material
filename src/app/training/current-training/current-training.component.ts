import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from 'rxjs';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from "./stop-training.component";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {

  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: any;
  dialogRefSubs!: Subscription;

  constructor( 
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
 
    this.startOrresumeTimer();
  }


  onStop() {

    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    this.dialogRefSubs = dialogRef.afterClosed().subscribe( (result) => {

      if( result ) {
        this.trainingExit.emit();
      } else {
        this.startOrresumeTimer();
      }
    } );
  }

  startOrresumeTimer() {

    // const step = this.trainingService.getRunningExcercise().duration / 100 * 1000;
    const step = this.trainingService.getRunningExcercise().duration / 100 * 1000;

    console.log('step', step);

    this.timer = setInterval( () => {

      this.progress = this.progress + 1;

      if( this.progress >= 100 )  {

        clearInterval(this.timer);
      }
    }, step );
  }

  ngOnDestroy() {
    this.dialogRefSubs.unsubscribe();
  }
}
