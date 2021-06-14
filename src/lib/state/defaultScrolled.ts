import { ScrolledState } from '../../model/state';

const defaultScrolled: ScrolledState = {
  scrollMode: 'horizontal',
  left: 0,
  maxLeft: 0,
  totalWidth: 0,
  totalHeight: 0,
  showPageSeparation: false,
  slugByPosition: new Map<number, string>(),
  positionBySlug: new Map<string, number>(),
  lastPosition: 0,
};

export default defaultScrolled;
