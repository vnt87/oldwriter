import React, { useState, useMemo } from 'react';
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
}

const NoteEditor: React.FC<NoteEditorProps> = ({ activeNote, onUpdateNote }) => {
  const [view, setView] = useState<'write' | 'preview'>('write');
  
  const renderedMarkdown = useMemo(() => {
    if (!activeNote?.content) return '';
    const rawMarkup = marked.parse(activeNote.content, { breaks: true, gfm: true });
    return DOMPurify.sanitize(rawMarkup);
  }, [activeNote?.content]);

  if (!activeNote) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
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

  const baseTabClass = 'px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-t-md';
  const activeTabClass = 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400';
  const inactiveTabClass = 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800';

  return (
    <main className="w-full h-2/3 md:h-screen flex flex-col bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <input
          type="text"
          value={activeNote.title}
          onChange={handleTitleChange}
          placeholder="Note Title"
          className="w-full text-2xl font-bold p-2 focus:outline-none bg-transparent dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          aria-label="Note title"
        />
      </div>
      <div className="px-4 pt-2 border-b border-gray-200 dark:border-gray-700 flex">
          <button onClick={() => setView('write')} className={`${baseTabClass} ${view === 'write' ? activeTabClass : inactiveTabClass}`}>
              Write
          </button>
          <button onClick={() => setView('preview')} className={`${baseTabClass} ${view === 'preview' ? activeTabClass : inactiveTabClass}`}>
              Preview
          </button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {view === 'write' ? (
          <textarea
            value={activeNote.content}
            onChange={handleContentChange}
            placeholder="Start writing... (Markdown supported!)"
            className="w-full h-full text-base p-2 resize-none leading-relaxed focus:outline-none bg-transparent dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
            aria-label="Note content"
          />
        ) : (
          <div
            className="markdown-preview"
            dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
          />
        )}
      </div>
    </main>
  );
};

export default NoteEditor;