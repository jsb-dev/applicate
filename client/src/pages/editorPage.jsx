import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
      {content !== null ? (
        <RichTextEditor content={content} />
      ) : (
        <RichTextEditor />
      )}
    </div>
  );
};

export default EditorPage;
