import React, { useEffect, useState } from 'react';
import checkAuth from '../auth/checkAuth.js';
import LoginPage from './loginPage.jsx';
import RichTextEditor from '../components/editor/editor.jsx';

const EditorPage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [docId, setDocId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setDocId(searchParams.get('docId'));

    checkAuth().then((auth) => {
      setIsAuthenticated(auth);
    });

    console.log('Sending request to load document: ', docId);
    fetch('/document/load', {
      method: 'POST',
      body: JSON.stringify({ docId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Received content from docId: ', docId);
        console.log('data.content: ', data.content);
        setContent(data.content);
        setLoading(false);
      });
  }, [docId]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isAuthenticated ? (
        !loading ? (
          <RichTextEditor content={content} docId={docId} />
        ) : (
          <div>Loading...</div>
        )
      ) : (
        <LoginPage />
      )}
    </div>
  );
};
export default EditorPage;
