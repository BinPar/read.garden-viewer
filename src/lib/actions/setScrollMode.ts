import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetScrollMode } from '../../model/actions/global';

const setScrollMode: ActionDispatcher<SetScrollMode> = async (action, state) => {
   if (state.scrollMode === 'fixed')  {
      throw new Error('Action not allowed in fixed mode');
   }
   return {
      scrollMode: action.scrollMode,
      layoutResetRequired: true,
   };
};

export default setScrollMode;
