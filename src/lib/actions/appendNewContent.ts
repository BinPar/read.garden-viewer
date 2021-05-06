import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { AppendNewContent } from '../../model/actions/global';

const appendNewContent: ActionDispatcher<AppendNewContent> = async (
  action,
  state,
) => {
  const { contentPlaceholderNode, dynamicStyleNode } = state;
  const parser = new DOMParser();
  const element = parser.parseFromString(action.htmlContent, 'text/html').body
    .firstChild as HTMLDivElement;
  contentPlaceholderNode?.replaceWith(element);
  if (action.cssURL && dynamicStyleNode) {
   dynamicStyleNode.href = action.cssURL;
  }
  return {
    contentPlaceholderNode: element,
  };
};

export default appendNewContent;
