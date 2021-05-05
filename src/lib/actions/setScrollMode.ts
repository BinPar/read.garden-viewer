import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetScrollMode } from '../../model/actions/global';
import { PageChange } from '../../model/events';

const setScrollMode: ActionDispatcher<SetScrollMode> = async (action, state) => {
   if (state.scrollMode === 'fixed')  {
      throw new Error('Action not allowed in fixed mode');
   }
   const event: PageChange = {
      type: 'pageChange',
      label: '12',
   }
   state.config.eventHandler(event);
   return {
      scrollMode: action.scrollMode,
      layoutResetRequired: true,
   };
};

export default setScrollMode;
