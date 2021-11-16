import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from 'rxjs';
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

  constructor( private dialog: MatDialog ) { }

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
    this.timer = setInterval( () => {

      this.progress = this.progress + 5;

      if( this.progress >= 100 )  {

        clearInterval(this.timer);
      }
    }, 1000 )
  }

  ngOnDestroy() {
    this.dialogRefSubs.unsubscribe();
  }
}
