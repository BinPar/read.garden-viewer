import { SelectionOption } from '../../model';

const selectionOptions: SelectionOption[] = [
  {
    color: '#ff0000',
    key: 'red',
    title: 'Red',
    className: 'highlighter',
    style: '--highlighter-color: #ff0000',
  },
  {
    color: '#ff00ff',
    key: 'pink',
    title: 'Pink',
    className: 'highlighter',
    style: '--highlighter-color: #ff00ff',
  },
  {
    color: '#00ff00',
    key: 'green',
    title: 'Green',
    className: 'highlighter',
    style: '--highlighter-color: #00ff00',
  },
  {
    color: '#0000ff',
    key: 'notes',
    title: 'Notes',
    className: 'note',
    style: '--highlighter-color: #0000ff',
  }
];

const getHighlighters = (): SelectionOption[] => selectionOptions;

export default getHighlighters;
