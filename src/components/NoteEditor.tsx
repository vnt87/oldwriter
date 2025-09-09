import React, { useMemo } from 'react';
import type { Note } from '../types';

declare const marked: {
  parse(markdown: string, options?: any): string;
};
declare const DOMPurify: {
  sanitize(dirty: string | Node, config?: any): string;
};

interface NoteEditorProps {
  activeNote: Note | null;
  onUpdateNote: (updatedNote: Partial<Note> & { id: string }) => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);


const NoteEditor: React.FC<NoteEditorProps> = ({ activeNote, onUpdateNote, isSidebarCollapsed, onToggleSidebar }) => {
  
  const renderedMarkdown = useMemo(() => {
    if (!activeNote || !activeNote.content) return '';
    const rawMarkup = marked.parse(activeNote.content, { breaks: true, gfm: true });
    return DOMPurify.sanitize(rawMarkup);
  }, [activeNote ? activeNote.content : null]);

  if (!activeNote) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white text-gray-500 relative">
        {isSidebarCollapsed && (
            <button
                onClick={onToggleSidebar}
                className="absolute top-4 left-4 p-2 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200"
                aria-label="Open sidebar"
            >
                <MenuIcon className="w-6 h-6" />
            </button>
        )}
        <div className="text-center">
            <h2 className="text-2xl font-semibold">Select a note</h2>
            <p>Or create a new one to start writing.</p>
        </div>
      </div>
    );
  }
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNote({ id: activeNote.id, title: e.target.value });
  };
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateNote({ id: activeNote.id, content: e.target.value });
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200 flex items-center space-x-4">
        {isSidebarCollapsed && (
            <button 
                onClick={onToggleSidebar}
                className="p-2 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200"
                aria-label="Open sidebar"
            >
                <MenuIcon className="w-6 h-6" />
            </button>
        )}
        <input
          type="text"
          value={activeNote.title}
          onChange={handleTitleChange}
          placeholder="Note Title"
          className="w-full text-2xl font-bold p-2 focus:outline-none bg-transparent placeholder-gray-400"
          aria-label="Note title"
        />
      </div>
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col border-b md:border-b-0 md:border-r border-gray-200">
            <div className="p-2 text-sm font-semibold bg-gray-50 border-b border-gray-200 text-gray-600 text-center">Markdown</div>
            <textarea
                value={activeNote.content}
                onChange={handleContentChange}
                placeholder="Start writing... (Markdown supported!)"
                className="w-full h-full text-base p-4 resize-none leading-relaxed focus:outline-none bg-transparent placeholder-gray-400 flex-grow"
                aria-label="Note content"
            />
        </div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
            <div className="p-2 text-sm font-semibold bg-gray-50 border-b border-gray-200 text-gray-600 text-center">Preview</div>
            <div
                className="markdown-preview flex-grow p-4 overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
            />
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
