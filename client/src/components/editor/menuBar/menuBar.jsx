import '../styles.scss';
import React from 'react';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import BoldIcon from '../../../assets/icons/bold.png';
import ItalicIcon from '../../../assets/icons/italic.png';
import StrikethroughIcon from '../../../assets/icons/strikethrough.png';
import CodeIcon from '../../../assets/icons/code.png';
import ClearStylesIcon from '../../../assets/icons/clearStyles.png';
import BulletListIcon from '../../../assets/icons/bulletList.png';
import OrderedListIcon from '../../../assets/icons/orderedList.png';
import BlockQuoteIcon from '../../../assets/icons/blockQuote.png';
import ClearFormatIcon from '../../../assets/icons/clearFormat.png';
import HorizontalRuleIcon from '../../../assets/icons/horizontalRule.png';
import HardBreakIcon from '../../../assets/icons/hardBreak.png';
import UndoIcon from '../../../assets/icons/undo.png';
import RedoIcon from '../../../assets/icons/redo.png';

const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event) => {
    anchorEl ? handleClose() : setAnchorEl(event.currentTarget);
  };

  return { anchorEl, handleClose, handleOpen };
};

const menuStyles = {
  padding: 5,
  borderRadius: 20,
  boxShadow: '2px 6px 15px 0px rgba(40, 0, 0, .6)',
};

const MenuBar = ({ editor }) => {
  const stylesMenu = useMenu();
  const formatMenu = useMenu();

  if (!editor) {
    return null;
  }

  const stylesItems = [
    {
      icon: BoldIcon,
      action: editor.chain().focus().toggleBold(),
      active: editor.isActive('bold'),
      disabled: !editor.can().chain().focus().toggleBold().run(),
    },
    {
      icon: ItalicIcon,
      action: editor.chain().focus().toggleItalic(),
      active: editor.isActive('italic'),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      icon: StrikethroughIcon,
      action: editor.chain().focus().toggleStrike(),
      active: editor.isActive('strike'),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
    },
    {
      icon: CodeIcon,
      action: editor.chain().focus().toggleCode(),
      active: editor.isActive('code'),
      disabled: !editor.can().chain().focus().toggleCode().run(),
    },
    {
      icon: ClearStylesIcon,
      action: editor.chain().focus().clearNodes(),
      active: false,
      disabled: !editor.can().chain().focus().clearNodes().run(),
    },
  ];

  const formatItems = [
    {
      icon: BulletListIcon,
      action: editor.chain().focus().toggleBulletList(),
      active: editor.isActive('bulletList'),
      disabled: !editor.can().chain().focus().toggleBulletList().run(),
    },
    {
      icon: OrderedListIcon,
      action: editor.chain().focus().toggleOrderedList(),
      active: editor.isActive('orderedList'),
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
    },
    {
      icon: BlockQuoteIcon,
      action: editor.chain().focus().toggleBlockquote(),
      active: editor.isActive('blockquote'),
      disabled: !editor.can().chain().focus().toggleBlockquote().run(),
    },
    {
      icon: ClearFormatIcon,
      action: editor.chain().focus().unsetAllMarks(),
      active: false,
      disabled: !editor.can().chain().focus().unsetAllMarks().run(),
    },
  ];

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
            onClick={stylesMenu.handleOpen}
            style={{
              backgroundImage: `url(${BoldIcon})`,
            }}
          >
            <Menu
              id="styles-menu"
              anchorEl={stylesMenu.anchorEl}
              keepMounted
              open={Boolean(stylesMenu.anchorEl)}
              onClose={stylesMenu.handleClose}
              PaperProps={{
                style: menuStyles,
              }}
            >
              {stylesItems.map((stylesItem, index) => (
                <button
                  key={index}
                  onClick={() => stylesItem.action.run()}
                  disabled={stylesItem.disabled}
                  className={stylesItem.active ? 'is-active' : ''}
                  style={{
                    backgroundImage: `url(${stylesItem.icon})`,
                  }}
                >
                  {stylesItem.title}
                </button>
              ))}
            </Menu>
          </button>
          <button
            onClick={formatMenu.handleOpen}
            style={{
              backgroundImage: `url(${BulletListIcon})`,
            }}
          >
            <Menu
              id="format-menu"
              anchorEl={formatMenu.anchorEl}
              keepMounted
              open={Boolean(formatMenu.anchorEl)}
              onClose={formatMenu.handleClose}
              PaperProps={{
                style: menuStyles,
              }}
            >
              {formatItems.map((formatItem, index) => (
                <button
                  id={'format-menu-item-' + index}
                  key={index}
                  onClick={() => formatItem.action.run()}
                  disabled={formatItem.disabled}
                  className={formatItem.active ? 'is-active' : ''}
                  style={{
                    backgroundImage: `url(${formatItem.icon})`,
                  }}
                >
                  {formatItem.title}
                </button>
              ))}
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
