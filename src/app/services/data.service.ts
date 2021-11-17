import { Injectable } from '@angular/core';
import { Firestore, collectionData, doc, docData, collection, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Note {
  id?: string;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: Firestore
  ) { }

  getNotes() : Observable<Note[]> {

    let notesRef = collection(this.firestore, `notes`);
    return collectionData( notesRef, {
      idField: 'id'
    } ) as Observable<Note[]>;
  }

  getNoteById(id: string) : Observable<Note> {

    let notesDocRef = doc(this.firestore, `notes/${id}`);
    return docData( notesDocRef, {
      idField: 'id'
    } ) as Observable<Note>;
  }

  addNote(note: Note) {

    const notesRef = collection(this.firestore, `notes`);
    return addDoc( notesRef, note);
  }

  deleteNote(id: string) {

    let notesDocRef = doc(this.firestore, `notes/${id}`);
    return deleteDoc( notesDocRef );
  }

  updateNote(note: Note) {

    let notesDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc( notesDocRef, {
      title: note.title,
      text: note.text,
    } );
  }
}
