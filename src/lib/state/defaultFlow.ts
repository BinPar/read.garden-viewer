import { DefaultFlowState, LayoutTypes } from '../../model/state';

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
};

export default defaultFlow;
