import { DefaultFlowState } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

const defaultFlow: DefaultFlowState = {
  layout: LayoutTypes.Flow,
  columnsInViewport: 2,
  fontFamily: 'Helvetica',
  fontSize: 18,
  textAlign: null,
  labels: [],
  snaps: [],
  columnWidth: 0,
  totalColumnWidth: 0,
  totalColumns: 0,
  chapterNumber: 0,
};

export default defaultFlow;
