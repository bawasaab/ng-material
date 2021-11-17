import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-material-twelve';
  noteId : any = 'XkMzWrWVm0CUzNGm7QVl';

  constructor(
    private dataService: DataService
  ) {}

  getNotes() {
    this.dataService.getNotes().subscribe( (res) => {
      console.log('get notes', res);
      this.noteId = res[0].id;
      console.log('this.noteId', this.noteId);
    } );
  }

  getNoteById() {
    this.dataService.getNoteById( this.noteId ).subscribe( (res) => {
      console.log('getNoteById', res);
    } );
  }

  async addNotes() {
    let in_data = {
      title: 'add-note',
      text: 'note-text'
    };
    let result = await this.dataService.addNote( in_data );
    console.log('add note', result);
  }

  async deleteNotes() {

    let result = await this.dataService.deleteNote( this.noteId );
    console.log('delete note', result);
  }

  async updateNotes() {
    let in_data = {
      id: this.noteId,
      title: 'add-notes',
      text: 'note-texts'
    };
    let result = await this.dataService.updateNote( in_data );
    console.log('add note', result);
  }
}
