import React, { useRef, useEffect } from 'react';
import env from 'react-dotenv';
import { EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import io from 'socket.io-client';
import MenuBar from './menuBar.jsx';
import './styles.scss';

const RichTextEditor = ({ content, docId }) => {
  const userId = localStorage.getItem('userId');

  const { REACT_APP_API_URL, ENDPOINT } = env;

  const socket = io(`${ENDPOINT}`, {
    withCredentials: true,
  });

  const editorRef = useRef(null);

  useEffect(() => {
    socket.emit('setup', userId);
    socket.emit('access document', docId);
  });

  useEffect(() => {
    socket.on('update broadcast', (json) => {
      const cursorPos = editor.state.selection.$anchor.pos;
      editor.commands.setContent(json);
      editor.chain().focus().setTextSelection(cursorPos).run();
    });
  });

  const editor = new Editor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      fetch(`${REACT_APP_API_URL}document/save`, {
        method: 'POST',
        body: JSON.stringify({ docId, json }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch((error) => {
        console.error('Error:', error);
      });
      socket.emit('document update', docId, json);
    },
  });

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div ref={editorRef} id="editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
