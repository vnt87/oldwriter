import React, { useState, useMemo } from 'react';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import useLocalStorage from './hooks/useLocalStorage';
import type { Note } from './types';

function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes-data', []);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarCollapsed, setSidebarCollapsed] = useLocalStorage<boolean>('sidebar-collapsed', true);

  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);

  const handleAddNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    if (isSidebarCollapsed) {
        setSidebarCollapsed(false);
    }
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
    <div className="flex h-screen font-sans bg-white text-gray-800">
      <div className={`flex-shrink-0 h-full transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-0' : 'w-full md:w-80'}`}>
          <NoteList
            notes={sortedNotes}
            activeNoteId={activeNoteId}
            onSelectNote={setActiveNoteId}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={toggleSidebar}
          />
      </div>
      <main className="flex-grow h-full flex flex-col w-full">
        <NoteEditor
          key={activeNote?.id || 'empty'}
          activeNote={activeNote}
          onUpdateNote={handleUpdateNote}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={toggleSidebar}
        />
      </main>
    </div>
  );
}

export default App;