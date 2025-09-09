import React from 'react';
import type { Note } from '../types';

interface NoteListProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
  onAddNote: () => void;
  onDeleteNote: (id: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

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

const DoubleChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
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
      className={`p-4 cursor-pointer border-b border-gray-200 group ${isActive ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-grow min-w-0">
          <h3 className="font-bold text-gray-800 truncate">{note.title || 'Untitled Note'}</h3>
          <p className="text-sm text-gray-500 truncate">{noteSnippet || 'No content'}</p>
        </div>
        <button
          onClick={onDelete}
          className="p-1 text-gray-400 rounded-full hover:bg-red-100 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
          aria-label="Delete note"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};


const NoteList: React.FC<NoteListProps> = ({ notes, activeNoteId, onSelectNote, onAddNote, onDeleteNote, searchTerm, onSearchChange, isCollapsed, onToggleCollapse }) => {
  return (
    <aside className="w-full h-full border-r border-gray-200 bg-gray-50 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-800">Notes</h2>
        <div className="flex items-center gap-2">
            <button
              onClick={onAddNote}
              className="p-2 text-gray-500 bg-gray-200 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
              aria-label="Add new note"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
            <button
              onClick={onToggleCollapse}
              className="p-2 text-gray-500 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              aria-label="Collapse sidebar"
            >
              <DoubleChevronLeftIcon className="w-5 h-5" />
            </button>
        </div>
      </div>
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
          <div className="p-8 text-center text-gray-500">
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