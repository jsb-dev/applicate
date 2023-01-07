import React from 'react';
import RichTextEditor from '../components/editor/editor.jsx';

const EditorPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <RichTextEditor />
    </div>
  );
};

export default EditorPage;
