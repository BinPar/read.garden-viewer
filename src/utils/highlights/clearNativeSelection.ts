import getSelection from '../../lib/animation/getSelection';

const clearNativeSelection = (): void => {
  const selection = getSelection();
  if (selection) {
    selection.removeAllRanges();
  }
};

export default clearNativeSelection;
