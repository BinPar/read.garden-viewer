import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { AppendNewContent } from '../../model/actions/global';

const appendNewContent: ActionDispatcher<AppendNewContent> = async (action) => {
   console.log(action.cssURL);
   return {

   };
};

export default appendNewContent;
