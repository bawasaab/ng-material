import { Observable, Subject } from "rxjs";
import { Injectable } from '@angular/core';
import { Exercise } from "./excercise.model";
import { Firestore, collectionData, doc, docData, collection, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  availableExcercisesCollection = 'availableExcercises';
  finihedExcercisesCollection = 'finihedExcercises';

  dated = new Date();

  excerciseChanges$ = new Subject<Exercise | null>();

  private availableExcercises: Exercise[] = [];

  private runningExcercise: any;
  private excercises: Exercise[] = [];

  constructor(
    private firestore: Firestore,
    private snakeBar: MatSnackBar,
  ) { }

  getAvailbleExcecises() {

    let notesRef = collection(this.firestore, `${this.availableExcercisesCollection}`);
    return collectionData( notesRef, {
      idField: 'id'
    } ) as Observable<Exercise[]>;
  }

  getExcerciseById( selectedId: string ) {
    let notesDocRef = doc(this.firestore, `${this.availableExcercisesCollection}/${selectedId}`);
    return docData( notesDocRef, {
      idField: 'id'
    } ) as Observable<Exercise>;
  }

  startExcercise( selectedId: string ) {

    console.log('selectedId', selectedId);
    
    this.getExcerciseById(selectedId).subscribe( (result) => {

      // this.runningExcercise = this.availableExcercises.find( (ex) => ex.id === selectedId );
      this.runningExcercise = result;
      this.excerciseChanges$.next({ ...this.runningExcercise });
    } );

  }

  completeExcercise() {

    this.insertExcercise({ 
      ...this.runningExcercise, 
      date: '2021-11-11',
      state: 'completed'
    });
    this.runningExcercise = null;
    this.excerciseChanges$.next(null);
    this.snakeBar.open( "Excercise Completed Successfully", 'OK', {
      duration: 3000
    });
  }

  cancelExcercise( progress: number ) {

    this.insertExcercise({ 
      ...this.runningExcercise, 
      duration: this.runningExcercise.duration * (progress / 100),
      calories: this.runningExcercise.calories * (progress / 100),
      date: '2021-11-11',
      state: 'cancelled'
    });
    this.runningExcercise = null;
    this.excerciseChanges$.next(null);
    this.snakeBar.open( "Excercise cancelled by user", 'OK', {
      duration: 3000
    });
  }

  insertExcercise( excercise: Exercise ) {

    const notesRef = collection(this.firestore, `${this.finihedExcercisesCollection}`);
    return addDoc( notesRef, excercise);
  }

  getRunningExcercise() {

    return { ...this.runningExcercise };
  }

  getCompletedOrCancelledExcercises() {
    
    let notesRef = collection(this.firestore, `${this.finihedExcercisesCollection}`);
    return collectionData( notesRef, {
      idField: 'id'
    } ) as Observable<Exercise[]>;
  }
}
