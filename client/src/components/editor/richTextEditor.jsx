import './styles.scss';
import { BubbleMenu, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useRef, useState } from 'react';
import MenuBar from './menuBar.jsx';

const TextEditor = ({ content, docId }) => {
  const editorRef = useRef(null);
  const [isEditable, setIsEditable] = useState(true);

  const editor = new Editor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      fetch('/document/save', {
        method: 'POST',
        body: JSON.stringify({ docId, json }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch((error) => {
        console.error('Error:', error);
      });
    },
  });

  return (
    <div ref={editorRef} id="editor">
      <MenuBar editor={editor} />
      <div>
        <input
          type="checkbox"
          checked={isEditable}
          onChange={() => setIsEditable(!isEditable)}
        />
        <label>Selection Popup Menu</label>
      </div>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            strike
          </button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
