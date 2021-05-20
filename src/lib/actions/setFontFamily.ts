import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetFontFamily } from '../../model/actions/flow';
import { LayoutTypes, State } from '../../model/state';
import { clean, highlightTerms } from '../../utils/highlights/search';

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
        highlightTerms(state.searchTerms);
      };
      const checkFonts = (): void => {
        if (document.fonts.status === 'loaded') {
          changeFontFamily();
          return;
        }
        document.fonts.onloadingdone = () => {
          document.fonts.onloadingdone = null;
          changeFontFamily();
        };
      };
      setCSSProperty('viewer-margin-top', '200vh');
      clean();
      setCSSProperty('font-family', fontFamily);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(checkFonts);
      });
    });
  }
  return {};
};

export default setFontFamily;
