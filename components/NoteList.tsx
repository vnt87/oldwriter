import React from 'react';
import type { Note } from '../types';

interface NoteListProps {
  notes: Note[];
  activeNoteId: string | null;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onSelectNote: (id: string) => void;
  onAddNote: () => void;
  onDeleteNote: (id: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM5.636 5.636a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zm9.192 0a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM2 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012 10zm14.5 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM10 18a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5A.75.75 0 0110 18zm-4.364-4.364a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0zm9.192 0a.75.75 0 01-1.06 0l-1.06-1.06a.75.75 0 011.06-1.06l1.06 1.06a.75.75 0 010 1.06zM10 15a5 5 0 110-10 5 5 0 010 10z" clipRule="evenodd" />
    </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M7.455 2.104a.75.75 0 00-.91 1.062 8.5 8.5 0 0010.58 10.58.75.75 0 001.062-.91A9.955 9.955 0 0118 10a9.999 9.999 0 01-9.394-9.954 9.954 9.954 0 01-1.151-1.942zM10 4.168a.563.563 0 01.306 0c.307.121.538.384.625.717.126.473.22.957.287 1.452 1.348.139 2.59.533 3.655 1.153.48.28.694.88.414 1.36a6.5 6.5 0 01-11.44 0 .75.75 0 01.414-1.36c1.065-.62 2.307-1.014 3.655-1.153a15.79 15.79 0 01.287-1.452.75.75 0 01.625-.717.563.563 0 01.306 0z" clipRule="evenodd" />
    </svg>
);

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.22-2.365.468a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
  </svg>
);

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
    </svg>
);

const NoteItem: React.FC<{
    note: Note,
    isActive: boolean,
    onSelect: () => void,
    onDelete: (e: React.MouseEvent) => void
}> = ({ note, isActive, onSelect, onDelete }) => {
  const noteSnippet = note.content.substring(0, 40) + (note.content.length > 40 ? "..." : "");

  return (
    <div
      onClick={onSelect}
      className={`p-4 cursor-pointer border-b border-gray-200 dark:border-gray-700 group ${isActive ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-grow min-w-0">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 truncate">{note.title || 'Untitled Note'}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{noteSnippet || 'No content'}</p>
        </div>
        <button
          onClick={onDelete}
          className="p-1 text-gray-400 rounded-full hover:bg-red-100 hover:text-red-500 dark:text-gray-500 dark:hover:bg-red-500/20 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
          aria-label="Delete note"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};


const NoteList: React.FC<NoteListProps> = ({ notes, activeNoteId, onSelectNote, onAddNote, onDeleteNote, theme, toggleTheme, searchTerm, onSearchChange }) => {
  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 h-1/3 md:h-screen border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Notes</h2>
        <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            </button>
            <button
              onClick={onAddNote}
              className="p-2 text-gray-500 bg-gray-200 rounded-full hover:bg-blue-500 hover:text-white dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-blue-600 dark:hover:text-white transition-colors"
              aria-label="Add new note"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
        </div>
      </div>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            aria-label="Search notes"
          />
        </div>
      </div>
      <div className="overflow-y-auto flex-grow">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              isActive={note.id === activeNoteId}
              onSelect={() => onSelectNote(note.id)}
              onDelete={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note.id);
              }}
            />
          ))
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            {searchTerm ? (
                <p>No notes matching your search.</p>
            ) : (
                <>
                    <p>No notes yet.</p>
                    <p>Create one to get started!</p>
                </>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default NoteList;