import { Subject } from "rxjs";
import { Injectable } from '@angular/core';
import { Exercise } from "./excercise.model";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  excerciseChanges$ = new Subject<Exercise>();

  private availableExcercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  // private runningExcercise: Exercise | undefined;
  private runningExcercise: any;

  constructor() { }

  getAvailbleExcecises() {
    return this.availableExcercises.slice(); // we create a new array
  }

  startExcercise( selectedId: string ) {
console.log('selectedId', selectedId);
    this.runningExcercise = this.availableExcercises.find( (ex) => ex.id === selectedId );
    this.excerciseChanges$.next({ ...this.runningExcercise });
  }

  getRunningExcercise() {

    return { ...this.runningExcercise };
  }
}
