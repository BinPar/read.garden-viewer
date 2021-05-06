import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { AppendNewContent } from '../../model/actions/global';
import { State } from '../../model/state';
import setCSSProperty from '../../viewer/setCSSProperty';

const appendNewContent: ActionDispatcher<AppendNewContent> = async (
  action,
  state,
) =>
  new Promise<Partial<State>>((resolve): void => {
    // console.log(action.cssURL);
    const {
      contentPlaceholderNode,
      dynamicStyleNode,
    } = state as Required<State>;
    const parser = new DOMParser();
    const element = parser.parseFromString(action.htmlContent, 'text/html').body
      .firstChild as HTMLDivElement;
    contentPlaceholderNode.replaceWith(element);
    const partialState: Partial<State> = {
      cssLoaded: true,
      contentPlaceholderNode: element,
    };
    const done = () => {
      resolve(partialState);
      setCSSProperty('viewer-margin-top', '0');
    };
    if (!action.cssURL || action.cssURL === dynamicStyleNode.href) {
      done();
      return;
    }
    dynamicStyleNode.onload = (): void => {
      // console.log('styles loaded, fonts', document.fonts.status);
      if (document.fonts.status === 'loaded') {
        dynamicStyleNode.onload = null;
        done();
        return;
      }
      document.fonts.onloadingdone = () => {
        // console.log('fonts loaded');
        dynamicStyleNode.onload = null;
        document.fonts.onloadingdone = null;
        done();
      };
    };
    dynamicStyleNode.href = action.cssURL;
  });

export default appendNewContent;
