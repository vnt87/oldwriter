import React, { useState, useMemo } from 'react';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import useLocalStorage from './hooks/useLocalStorage';
import useTheme from './hooks/useTheme';
import type { Note } from './types';

function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes-data', []);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [theme, toggleTheme] = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (idToDelete: string) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
    if (activeNoteId === idToDelete) {
      setActiveNoteId(null);
    }
  };

  const handleUpdateNote = (updatedNote: Partial<Note> & { id: string }) => {
    setNotes(
      notes.map((note) => {
        if (note.id === updatedNote.id) {
          return { ...note, ...updatedNote, lastModified: Date.now() };
        }
        return note;
      })
    );
  };

  const sortedNotes = useMemo(() => {
    const sorted = [...notes].sort((a, b) => b.lastModified - a.lastModified);
    if (!searchTerm.trim()) {
      return sorted;
    }
    return sorted.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notes, searchTerm]);

  const activeNote = useMemo(() => {
      return notes.find((note) => note.id === activeNoteId) || null;
  }, [notes, activeNoteId]);

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans bg-white dark:bg-gray-900">
      <NoteList
        notes={sortedNotes}
        activeNoteId={activeNoteId}
        onSelectNote={setActiveNoteId}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
        theme={theme}
        toggleTheme={toggleTheme}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <NoteEditor
        key={activeNote?.id || 'empty'}
        activeNote={activeNote}
        onUpdateNote={handleUpdateNote}
      />
    </div>
  );
}

export default App;