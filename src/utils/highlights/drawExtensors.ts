import { getState } from '../../lib/state';
import { State } from '../../model';
import removeLayerHighlights from './removeLayerHighlights';

let left: HTMLDivElement | null = null;
let right: HTMLDivElement | null = null;

const getLeftExtensor = (): HTMLDivElement => {
  if (!left) {
    left = document.createElement('div');
    left.classList.add('rg-selection-extensor', 'rg-left-extensor');
  }
  return left;
};

const getRightExtensor = (): HTMLDivElement => {
  if (!right) {
    right = document.createElement('div');
    right.classList.add('rg-selection-extensor', 'rg-right-extensor');
  }
  return right;
};

const drawExtensors = (range: Range, state = getState()): void => {
  const { selectionSelectorsNode } = state as Required<State>;
  removeLayerHighlights(selectionSelectorsNode);
  const rects = Array.from(range.getClientRects());
  const [first] = rects;
  const [last] = rects.slice(-1);
  const leftExtensor = getLeftExtensor();
  leftExtensor.style.top = `${first.top}px`;
  leftExtensor.style.left = `${first.left}px`;
  const rightExtensor = getRightExtensor();
  rightExtensor.style.top = `${last.top}px`;
  rightExtensor.style.right = `${last.right}px`;
  selectionSelectorsNode.appendChild(leftExtensor);
  selectionSelectorsNode.appendChild(rightExtensor);
};

export default drawExtensors;