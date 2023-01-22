import './styles.scss';
import React from 'react';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import BoldIcon from '../../assets/icons/bold.png';
import ItalicIcon from '../../assets/icons/italic.png';
import StrikethroughIcon from '../../assets/icons/strikethrough.png';
import CodeIcon from '../../assets/icons/code.png';
import ClearStylesIcon from '../../assets/icons/clearStyles.png';
import BulletListIcon from '../../assets/icons/bulletList.png';
import OrderedListIcon from '../../assets/icons/orderedList.png';
import BlockQuoteIcon from '../../assets/icons/blockQuote.png';
import ClearFormatIcon from '../../assets/icons/clearFormat.png';
import HorizontalRuleIcon from '../../assets/icons/horizontalRule.png';
import HardBreakIcon from '../../assets/icons/hardBreak.png';
import UndoIcon from '../../assets/icons/undo.png';
import RedoIcon from '../../assets/icons/redo.png';

const MenuBar = ({ editor }) => {
  const [stylesAnchorEl, setStylesAnchorEl] = useState(null);
  const [formatAnchorEl, setFormatAnchorEl] = useState(null);

  const handleStylesClose = () => {
    setStylesAnchorEl(null);
  };

  const handleStylesOpen = (event) => {
    stylesAnchorEl
      ? handleStylesClose()
      : setStylesAnchorEl(event.currentTarget);
  };

  const handleFormatClose = () => {
    setFormatAnchorEl(null);
  };

  const handleFormatOpen = (event) => {
    formatAnchorEl
      ? handleFormatClose()
      : setFormatAnchorEl(event.currentTarget);
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: 'fit-content',
          zIndex: 100,
        }}
      >
        <div
          style={{
            backgroundColor: '#383838',
            borderRadius: 20,
            padding: 10,
            margin: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={handleStylesOpen}
            style={{
              backgroundImage: `url(${BoldIcon})`,
            }}
          >
            <Menu
              id="simple-menu"
              class="menu"
              anchorEl={stylesAnchorEl}
              keepMounted
              open={Boolean(stylesAnchorEl)}
              onClose={handleStylesClose}
              PaperProps={{
                style: {
                  padding: 10,
                  borderRadius: 20,
                  boxShadow: '2px 6px 15px 0px rgba(40, 0, 0, .6)',
                },
              }}
            >
              <div
                styles={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().chain().focus().toggleBold().run()}
                  className={editor.isActive('bold') ? 'is-active' : ''}
                  style={{
                    backgroundImage: `url(${BoldIcon})`,
                  }}
                ></button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  className={editor.isActive('italic') ? 'is-active' : ''}
                  style={{
                    backgroundImage: `url(${ItalicIcon})`,
                  }}
                ></button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  disabled={!editor.can().chain().focus().toggleStrike().run()}
                  className={editor.isActive('strike') ? 'is-active' : ''}
                  style={{
                    backgroundImage: `url(${StrikethroughIcon})`,
                  }}
                ></button>
                <button
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  disabled={!editor.can().chain().focus().toggleCode().run()}
                  className={editor.isActive('code') ? 'is-active' : ''}
                  style={{
                    backgroundImage: `url(${CodeIcon})`,
                    backgroundSize: '70%',
                  }}
                ></button>
                <button
                  onClick={() => editor.chain().focus().unsetAllMarks().run()}
                  style={{
                    backgroundImage: `url(${ClearStylesIcon})`,
                  }}
                ></button>
              </div>
            </Menu>
          </button>
          <button
            onClick={handleFormatOpen}
            style={{
              backgroundImage: `url(${BulletListIcon})`,
            }}
          >
            <Menu
              id="simple-menu"
              anchorEl={formatAnchorEl}
              keepMounted
              open={Boolean(formatAnchorEl)}
              onClose={handleFormatClose}
              PaperProps={{
                style: {
                  padding: 10,
                  borderRadius: 20,
                  boxShadow: '2px 6px 15px 0px rgba(40, 0, 0, .6)',
                },
              }}
            >
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
                style={{
                  backgroundImage: `url(${BulletListIcon})`,
                  backgroundSize: '80%',
                }}
              ></button>
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
                style={{
                  backgroundImage: `url(${OrderedListIcon})`,
                  backgroundSize: '70%',
                }}
              ></button>
              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
                style={{
                  backgroundImage: `url(${BlockQuoteIcon})`,
                  backgroundSize: '110%',
                }}
              ></button>
              <button
                onClick={() => editor.chain().focus().clearNodes().run()}
                style={{
                  backgroundImage: `url(${ClearFormatIcon})`,
                  backgroundSize: '90%',
                }}
              ></button>
            </Menu>
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            style={{
              backgroundImage: `url(${HorizontalRuleIcon})`,
              backgroundSize: '60%',
            }}
          ></button>
          <button
            onClick={() => editor.chain().focus().setHardBreak().run()}
            style={{
              backgroundImage: `url(${HardBreakIcon})`,
              backgroundSize: '80%',
            }}
          ></button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            style={{
              backgroundImage: `url(${UndoIcon})`,
              backgroundSize: '60%',
            }}
          ></button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            style={{
              backgroundImage: `url(${RedoIcon})`,
              backgroundSize: '60%',
            }}
          ></button>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
