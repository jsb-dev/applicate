import './styles.scss';
import { BubbleMenu, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import io from 'socket.io-client';
import React, { useRef, useEffect } from 'react';
import BoldIcon from '../../assets/icons/bold.png';
import ItalicIcon from '../../assets/icons/italic.png';
import StrikethroughIcon from '../../assets/icons/strikethrough.png';
import MenuBar from './menuBar.jsx';

const ENDPOINT = 'http://localhost:3000';
const userId = localStorage.getItem('userId');
const userEmail = localStorage.getItem('userEmail');

const socket = io(ENDPOINT);

const RichTextEditor = ({ content, docId }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    socket.emit('setup', userId, userEmail);
    socket.emit('access document', userId, docId);
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
      fetch('/document/save', {
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
  }, []);

  return (
    <div ref={editorRef} id="editor">
      <MenuBar editor={editor} />

      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
            style={{
              backgroundImage: `url(${BoldIcon})`,
              boxShadow: '0 0 0 1px #000',
            }}
          />
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
            style={{
              backgroundImage: `url(${ItalicIcon})`,
              boxShadow: '0 0 0 1px #000',
            }}
          />
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
            style={{
              backgroundImage: `url(${StrikethroughIcon})`,
              boxShadow: '0 0 0 1px #000',
            }}
          />
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
