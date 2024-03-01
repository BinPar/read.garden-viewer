import { State } from "../../model/state";
import { LayoutTypes } from "../../model/viewerSettings";

const getScrollFromContentSlug = (state: State, contentSlug = state.contentSlug): number | null => {
  let result = 0;
  if (state.scrollMode === 'vertical' || state.scrollMode === 'horizontal' ) {
    let labelPosition = state.positionBySlug.get(contentSlug);
    if (labelPosition !== undefined) {
      let i = 0;
      let lastPosition = 0;
      let found = false;
      let nextPage = 0;
      state.positionBySlug.forEach((position, key) => {
        if (!found) {
          if (lastPosition !== position) {
            i++;
            lastPosition = position;
          }
          if (state.layout === LayoutTypes.Flow) {
            if (i % state.columnsInViewport === 0) {
              labelPosition = position;
            }
          }
          if (key === contentSlug) {
            found = true;
          }
        } else if (!nextPage) {
          nextPage = position;
        }
      });
      result -= labelPosition ?? 0; 
      if (!found) {
        return null;
      }
    }
  }
  return result;
}

export default getScrollFromContentSlug;