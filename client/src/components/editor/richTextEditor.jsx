import React, { useRef, useEffect } from 'react';
import env from 'react-dotenv';
import { BubbleMenu, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import io from 'socket.io-client';
import BoldIcon from '../../assets/icons/bold.png';
import ItalicIcon from '../../assets/icons/italic.png';
import StrikethroughIcon from '../../assets/icons/strikethrough.png';
import MenuBar from './menuBar.jsx';
import './styles.scss';

const RichTextEditor = ({ content, docId }) => {
  const userId = localStorage.getItem('userId');

  const { REACT_APP_API_URL, ENDPOINT } = env;

  const socket = io(ENDPOINT, { transports: ['websocket'] });

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
