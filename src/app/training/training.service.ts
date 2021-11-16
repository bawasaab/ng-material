import { Subject } from "rxjs";
import { Injectable } from '@angular/core';
import { Exercise } from "./excercise.model";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  excerciseChanges$ = new Subject<Exercise | null>();

  private availableExcercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  // private runningExcercise: Exercise | undefined;
  private runningExcercise: any;
  private excercises: Exercise[] = [];

  constructor() { }

  getAvailbleExcecises() {
    return this.availableExcercises.slice(); // we create a new array
  }

  startExcercise( selectedId: string ) {

    this.runningExcercise = this.availableExcercises.find( (ex) => ex.id === selectedId );
    this.excerciseChanges$.next({ ...this.runningExcercise });
  }

  completeExcercise() {

    this.excercises.push({ 
      ...this.runningExcercise, 
      date: new Date,
      state: 'completed'
    });
    this.runningExcercise = null;
    this.excerciseChanges$.next(null);
  }

  cancelExcercise( progress: number ) {

    this.excercises.push({ 
      ...this.runningExcercise, 
      duration: this.runningExcercise.duration * (progress / 100),
      calories: this.runningExcercise.duration * (progress / 100),
      date: new Date,
      state: 'cancelled'
    });
    this.runningExcercise = null;
    this.excerciseChanges$.next(null);
  }

  getRunningExcercise() {

    return { ...this.runningExcercise };
  }
}
