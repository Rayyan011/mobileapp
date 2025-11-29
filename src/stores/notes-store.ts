import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable, hydrateStore } from 'mobx-persist-store';
import { PVoid } from './types';

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export class NotesStore {
  notes: Note[] = [];
  isHydrated = false;

  constructor() {
    makeAutoObservable(this);
    
    makePersistable(this, {
      name: 'NotesStore',
      properties: ['notes'],
    });
  }
  
  get isReady(): boolean {
    return this.isHydrated;
  }

  addNote(title: string, content: string, id?: string) {
    runInAction(() => {
      const newNote: Note = {
        id: id || Date.now().toString(),
        title,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      // Create new array reference immediately to ensure reactivity
      this.notes = [newNote, ...this.notes];
      this.sortByUpdatedAt();
    });
  }

  updateNote(id: string, title: string, content: string) {
    runInAction(() => {
      const noteIndex = this.notes.findIndex(n => n.id === id);
      if (noteIndex !== -1) {
        // Create a new note object to ensure MobX tracks the change
        const updatedNote: Note = {
          ...this.notes[noteIndex],
          title,
          content,
          updatedAt: new Date().toISOString(),
        };
        // Replace the note in a new array to force reactivity
        this.notes = [
          ...this.notes.slice(0, noteIndex),
          updatedNote,
          ...this.notes.slice(noteIndex + 1),
        ];
        this.sortByUpdatedAt();
      }
    });
  }

  deleteNote(id: string) {
    runInAction(() => {
      this.notes = this.notes.filter(n => n.id !== id);
    });
  }

  getNote(id: string): Note | undefined {
    return this.notes.find(n => n.id === id);
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this);
    runInAction(() => {
      this.isHydrated = true;
      // Force array reference update after hydration
      this.notes = [...this.notes];
    });
  };

  private sortByUpdatedAt() {
    // Create a new array reference to ensure MobX detects the change
    this.notes = [...this.notes].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }
}

