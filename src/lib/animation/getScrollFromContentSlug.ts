import { State } from "../../model/state";
import { LayoutTypes } from "../../model/viewerSettings";

const getScrollFromContentSlug = (state: State, contentSlug = state.contentSlug): number => {
  let result = 0;
  if (state.layout === LayoutTypes.Flow) {
    let labelPosition = state.positionByLabel.get(contentSlug);
    if (labelPosition) {
      if (state.columnsInViewport > 1) {
        let i = 0;
        let lastPosition = 0;
        let found = false;
        state.positionByLabel.forEach((position, key) => {
          if (!found) {
            if (lastPosition !== position) {
              i++;
              lastPosition = position;
            }
            if (i % state.columnsInViewport === 0) {
              labelPosition = position;
            }
            if (key === contentSlug) {
              found = true;
            }
          }
        });
      }
      result -= labelPosition ?? 0;
    }
  }
  return result;
}

export default getScrollFromContentSlug;