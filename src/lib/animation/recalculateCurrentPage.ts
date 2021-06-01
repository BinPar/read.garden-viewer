import { ScrolledState } from "../../model/state";
import { updateState } from "../state";

const recalculateCurrentPage = (state: ScrolledState, currentScroll: number): void => {  
  const target = state.labelByPosition.get(Math.round(currentScroll * -1));
  if (target !== undefined) {
    updateState({ contentSlug: target });
  }
};

export default recalculateCurrentPage;