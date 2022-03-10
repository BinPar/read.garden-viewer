import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetFontFamily } from '../../model/actions/flow';
import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

import { drawHighlights } from '../../utils/highlights';
import clearSelection from '../../utils/highlights/clearSelection';
import { removeExtensors } from '../../utils/highlights/drawExtensors';
import redrawUserHighlights from '../../utils/highlights/redrawUserHighlights';
import removeNotesDialog from '../../utils/highlights/removeNotesDialog';
import removeSelectionMenu from '../../utils/highlights/removeSelectionMenu';
import removeUserHighlights from '../../utils/highlights/removeUserHighlights';
import { clean } from '../../utils/highlights/search';
import setCSSProperty from '../../utils/setCSSProperty';
import recalculate from '../../viewer/recalculate';
import { getState, updateState } from '../state';

const securityTime = 10000;

/**
 * Sets font family to provided value and recalculates
 * @param context.state  Viewer state
 * @param context.action  Viewer action, containing desired new font family
 * @returns State update
 */
const setFontFamily: ActionDispatcher<SetFontFamily> = async ({ state, action }) => {
  if (state.layout === LayoutTypes.Fixed) {
    throw new Error('Action not allowed in fixed mode');
  }
  const { fontFamily } = action;
  if (state.config.availableFontFamilies.indexOf(fontFamily) === -1) {
    throw new Error(
      'Desired font family is not among the available font families provided in config',
    );
  }
  if (fontFamily !== state.fontFamily) {
    return new Promise<Partial<State>>((resolve, reject) => {
      const securityTimeout = setTimeout(() => {
        reject(
          new Error(
            `Couldn't resolve font family change and font load after ${
              securityTime / 1000
            } seconds`,
          ),
        );
      }, securityTime);
      const changeFontFamily = async (): Promise<void> => {
        clearTimeout(securityTimeout);
        updateState({ fontFamily });
        const newState = getState();
        const recalculateUpdate = await recalculate(newState);
        setCSSProperty('viewer-margin-top', '0');
        resolve({
          ...recalculateUpdate,
          layout: state.layout,
          scrollMode: state.scrollMode,
          fontFamily,
        });
        await redrawUserHighlights(state);
        if (state.searchRanges.length && state.searchTermsHighlightsNode) {
          drawHighlights(state.searchTermsHighlightsNode, state.searchRanges);
        }
      };
      const checkFonts = (): void => {
        if (document.fonts.status === 'loaded') {
          changeFontFamily().catch((ex) => {
            const { stack, message } = ex as Error;
            console.error('Error changing font family', stack || message);
          });
          return;
        }
        document.fonts.onloadingdone = (): void => {
          document.fonts.onloadingdone = null;
          changeFontFamily().catch((ex) => {
            const { stack, message } = ex as Error;
            console.error('Error changing font family', stack || message);
          });
        };
      };
      setCSSProperty('viewer-margin-top', '200vh');
      clean(state);
      clearSelection(state);
      removeExtensors(state);
      removeSelectionMenu(state);
      removeNotesDialog(state);
      removeUserHighlights(state);
      setCSSProperty('font-family', fontFamily);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(checkFonts);
      });
    });
  }
  return {};
};

export default setFontFamily;
