import './styles.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Menu from '@mui/material/Menu';
import BoldIcon from '../../assets/icons/bold.png';
import ItalicIcon from '../../assets/icons/italic.png';
import StrikethroughIcon from '../../assets/icons/strikethrough.png';
import CodeIcon from '../../assets/icons/code.png';
import ClearStylesIcon from '../../assets/icons/clearStyles.png';
import HeaderSizeIcon from '../../assets/icons/heading.png';
import BulletListIcon from '../../assets/icons/bulletList.png';
import OrderedListIcon from '../../assets/icons/orderedList.png';
import BlockQuoteIcon from '../../assets/icons/blockQuote.png';
import ClearFormatIcon from '../../assets/icons/clearFormat.png';
import HorizontalRuleIcon from '../../assets/icons/horizontalRule.png';
import HardBreakIcon from '../../assets/icons/hardBreak.png';
import ExitIcon from '../../assets/icons/exit.png';

const BackToDashboardButton = () => {
  return (
    <Link to="/dashboard">
      <button
        style={{
          backgroundImage: `url(${ExitIcon})`,
          backgroundSize: '70%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: 30,
          height: 30,
        }}
      ></button>
    </Link>
  );
};

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
  padding: 10,
  borderRadius: 20,
};

const MenuBar = ({ editor }) => {
  const stylesMenu = useMenu();
  const formatMenu = useMenu();
  const headerSizeMenu = useMenu();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const isTablet = useMediaQuery('(max-width:960px)');

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
      action: editor.chain().focus().unsetAllMarks(),
      active: false,
      disabled: !editor.can().chain().focus().unsetAllMarks().run(),
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
      action: editor.chain().focus().clearNodes(),
      active: false,
      disabled: !editor.can().chain().focus().clearNodes().run(),
    },
  ];

  const headerSizeItems = [
    {
      title: '14pt',
      action: editor.chain().focus().toggleHeading({ level: 6 }),
      active: editor.isActive('heading', { level: 6 }),
    },
    {
      title: '16pt',
      action: editor.chain().focus().toggleHeading({ level: 5 }),
      active: editor.isActive('heading', { level: 5 }),
    },
    {
      title: '18pt',
      action: editor.chain().focus().toggleHeading({ level: 4 }),
      active: editor.isActive('heading', { level: 4 }),
    },
    {
      title: '20pt',

      action: editor.chain().focus().toggleHeading({ level: 3 }),
      active: editor.isActive('heading', { level: 3 }),
    },
    {
      title: '22pt',
      action: editor.chain().focus().toggleHeading({ level: 2 }),
      active: editor.isActive('heading', { level: 2 }),
    },
    {
      title: '24pt',
      action: editor.chain().focus().toggleHeading({ level: 1 }),
      active: editor.isActive('heading', { level: 1 }),
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
          width: isTablet ? '100%' : 'calc((100vw - 8.3in) / 2)',
          height: isTablet ? 'fit-content' : '100%',
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
            flexDirection: isTablet ? 'row' : 'column',
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
            onClick={headerSizeMenu.handleOpen}
            style={{
              backgroundImage: `url(${HeaderSizeIcon})`,
            }}
          >
            <Menu
              id="styles-menu"
              anchorEl={headerSizeMenu.anchorEl}
              keepMounted
              open={Boolean(headerSizeMenu.anchorEl)}
              onClose={headerSizeMenu.handleClose}
              PaperProps={{
                style: {
                  ...menuStyles,
                  width: 190,
                },
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gridGap: 10,
                }}
              >
                {headerSizeItems.map((headerSizeItem, index) => (
                  <button
                    key={index}
                    onClick={() => headerSizeItem.action.run()}
                    disabled={headerSizeItem.disabled}
                    className={headerSizeItem.active ? 'is-active' : ''}
                    title={headerSizeItem.title}
                  >
                    {headerSizeItem.title}
                  </button>
                ))}
              </div>
            </Menu>
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            style={{
              backgroundImage: `url(${HorizontalRuleIcon})`,
              backgroundSize: '60%',
            }}
          />
          <button
            onClick={() => editor.chain().focus().setHardBreak().run()}
            style={{
              backgroundImage: `url(${HardBreakIcon})`,
              backgroundSize: '80%',
            }}
          />
          <BackToDashboardButton />
        </div>
      </div>
    </>
  );
};

export default MenuBar;
