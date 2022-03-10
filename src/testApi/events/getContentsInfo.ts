import { SetContentsInfo } from '../../model/actions/fixed';
import { GetContentsInfo } from '../../model/events';
import { FixedContentInfo } from '../../model/state';
import loadIndexFile from '../utils/loadIndexFile';
import { EventHandler } from './eventHandler';

/**
 * Triggered when viewer needs contents info (usually because it needs to build content wrapper)
 * @param event Viewer event
 * @param dispatch Viewer action dispatcher
 */
const getContentsInfo: EventHandler<GetContentsInfo> = async (event, dispatch): Promise<void> => {
  const { slug } = event;
  const index = await loadIndexFile(slug);
  const action: SetContentsInfo = {
    type: 'setContentsInfo',
    info: index.contents.map(({ width, height, labels }, i): FixedContentInfo => {
      const [label] = labels;
      return {
        label,
        order: i,
        slug: label.toLowerCase(),
        width: width!,
        height: height!,
      };
    }),
  };
  dispatch(action).catch((ex) => {
    const { stack, message } = ex as Error;
    console.error('Error dispatching action', stack || message);
  });
};

export default getContentsInfo;
