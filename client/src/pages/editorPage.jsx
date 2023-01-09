import React, { useEffect, useState } from 'react';
import RichTextEditor from '../components/editor/editor.jsx';

const EditorPage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [docId, setDocId] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setDocId(searchParams.get('docId'));
    console.log('Sending fetch request... ');
    // Make a fetch request to the '/load' endpoint with the docId in the request body
    fetch('/load', {
      method: 'POST',
      body: JSON.stringify({ docId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setContent(data.content[0]);
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
      {!loading ? (
        <RichTextEditor content={content} docId={docId} />
      ) : (
        // You can render a loading indicator here while the data is being fetched
        <div>Loading...</div>
      )}
    </div>
  );
};
export default EditorPage;
