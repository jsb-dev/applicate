import { EditorState } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';

export const state = EditorState.create({
  schema: new Schema({
    nodes: {
      doc: {
        content: 'page+',
      },
      page: {
        content: 'paragraph+',
        toDOM: (node) => ['div', { class: 'page' }, 0],
        parseDOM: [{ tag: 'div.page' }],
        create: () => ({ type: 'page' }),
      },
      paragraph: {
        content: 'text*',
        group: 'block',
        toDOM: (node) => ['p', 0],
        parseDOM: [{ tag: 'p' }],
      },
      text: {
        group: 'inline',
      },
    },
    marks: {},
  }),
});

export const schema = new Schema({
  nodes: {
    doc: {
      content: 'page+',
    },
    page: {
      content: 'paragraph+',
      toDOM: (node) => ['div', { class: 'page' }, 0],
      parseDOM: [{ tag: 'div.page' }],
      create: () => ({ type: 'page' }),
    },
    paragraph: {
      content: 'text*',
      group: 'block',
      toDOM: (node) => ['p', 0],
      parseDOM: [{ tag: 'p' }],
    },
    text: {
      group: 'inline',
    },
  },
  marks: {},
});
