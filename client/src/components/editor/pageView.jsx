import React, { useEffect, useRef } from 'react';

const PageView = ({ editorView, node }) => {
  const ref = useRef(null);
  const pagesRef = useRef([]);

  useEffect(() => {
    const content = ref.current;
    content.innerHTML = '';
    editorView.renderNode(content, node);
    pagesRef.current.push(content);
  }, [node, editorView]);

  return (
    <div ref={ref} className="page">
      <div className="page-content"></div>
    </div>
  );
};

export default PageView;
/* 

You would then need to use this custom view in your editor's configuration:

const editor = new Editor({
  content: '',
  view: new EditorView(document.querySelector('#editor'), {
    state: state,
    nodeViews: {
      page: PageView
    }
  })
});

*/
