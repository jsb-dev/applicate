import React, { useEffect, useState } from 'react';
import checkAuth from '../utils/checkAuth.js';
import LoginPage from './loginPage.jsx';
import RichTextEditor from '../components/editor/editor.jsx';

const EditorPage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [docId, setDocId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchAndUpdate() {
      const auth = await checkAuth();
      setIsAuthenticated(auth);

      const searchParams = new URLSearchParams(window.location.search);
      setDocId(searchParams.get('docId'));

      if (docId !== null) {
        const response = await fetch('/document/load', {
          method: 'POST',
          body: JSON.stringify({ docId }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setContent(data.content);
        setLoading(false);
      }
    }

    fetchAndUpdate();
  }, [docId, isAuthenticated]);

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
