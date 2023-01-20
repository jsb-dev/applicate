import './styles.scss';

import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useRef, useEffect } from 'react';
import { EditorView } from 'prosemirror-view';
import { schema, state } from './schema.js';
import PageView from './pageView.jsx';
import MenuBar from './menuBar.jsx';

const TextEditor = ({ content, docId }) => {
  const editorRef = useRef(null);
  const [isEditable, setIsEditable] = React.useState(true);

  const pagesRef = useRef([]);

  function handleOverflow(event) {
    const pageNode = event.target.querySelector('.ProseMirror');
    // Check if the page content overflows
    if (pageNode.scrollHeight > pageNode.clientHeight) {
      // Create a new page node
      const newPageNode = editor.schema.nodes.page.create();
      // Move the overflowing content to the new page node
      const overflowingContent = pageNode.querySelector('.overflowing-content');
      newPageNode.content.append(overflowingContent);
      // Insert the new page node after the current page node
      const tr = editor.state.tr;
      tr.insert(event.target.end, newPageNode);
      editor.view.updateState(tr);
      pagesRef.current.push(newPageNode);
    }
  }

  // Create the editor
  const editor = useEditor({
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
    schema: schema,
    view: new EditorView(editorRef.current, {
      state: state,
      nodeViews: {
        page: (node, view, getPos) => (
          <PageView editorView={view} node={node} key={getPos()} />
        ),
      },
    }),
  });

  useEffect(() => {
    if (isEditable) {
      editorRef.current.addEventListener('overflow', handleOverflow);
    } else {
      editorRef.current.removeEventListener('overflow', handleOverflow);
    }
    return () => {
      editorRef.current.removeEventListener('overflow', handleOverflow);
    };
  }, [isEditable, editor]);

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

      <EditorContent editor={editor}></EditorContent>
    </div>
  );
};

export default TextEditor;
