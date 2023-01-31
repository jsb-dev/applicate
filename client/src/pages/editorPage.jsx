import React, { useEffect, useState } from 'react';
import checkAuth from '../utils/checkAuth.js';
import RichTextEditor from '../components/editor/richTextEditor.jsx';
import LoadingSpinner from '../components/global/loadingSpinner.jsx';

const EditorPage = () => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [docId, setDocId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const searchParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    async function fetchAndUpdate() {
      const auth = await checkAuth();
      setIsAuthenticated(auth);
      setDocId(searchParams.get('docId'));

      if (docId) {
        const response = await fetch('/document/load', {
          method: 'POST',
          body: JSON.stringify({ docId }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        const user = localStorage.getItem('userId');
        if (data.success) {
          if (user !== data.userId && data.collaborators.indexOf(user) === -1) {
            console.log(user, data.userId, data.collaborators);

            window.location.href = '/dashboard';
          } else {
            setContent(data.content);
            setIsLoading(false);
          }
        } else {
          window.location.href = '/dashboard';
        }
      }
    }

    fetchAndUpdate();
  }, [docId, isAuthenticated]);

  if (
    searchParams.get('docId') === null ||
    searchParams.get('docId') === '' ||
    searchParams.get('docId') === undefined
  ) {
    return (window.location.href = '/dashboard');
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isAuthenticated ? (
        !isLoading ? (
          <RichTextEditor content={content} docId={docId} />
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default EditorPage;
