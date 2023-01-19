import { ActionDispatcher, LinkProps, SetLinkProps } from '../../model';

/**
 * Sets custom link info to override original info
 * @param context.state Viewer state
 * @param context.action Viewer action, containing link props 
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/require-await
const setLinkProps: ActionDispatcher<SetLinkProps> = async ({ state, action }) => {
  const { linksCustomProps } = state;
  const info: LinkProps = {
    href: action.href,
  };
  if (action.target) {
    info.target = action.target;
  }
  linksCustomProps.set(action.link, info);
  return {
    linksCustomProps,
  };
};

export default setLinkProps;
