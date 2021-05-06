import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { AppendNewContent } from '../../model/actions/global';
import { State } from '../../model/state';

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
    if (!action.cssURL || action.cssURL === dynamicStyleNode.href) {
      resolve(partialState);
      return;
    }
    dynamicStyleNode.onload = (): void => {
      // console.log('styles loaded, fonts', document.fonts.status);
      if (document.fonts.status === 'loaded') {
        dynamicStyleNode.onload = null;
        resolve(partialState);
        return;
      }
      document.fonts.onloadingdone = () => {
        // console.log('fonts loaded');
        dynamicStyleNode.onload = null;
        document.fonts.onloadingdone = null;
        resolve(partialState);
      };
    };
    dynamicStyleNode.href = action.cssURL;
  });

export default appendNewContent;
