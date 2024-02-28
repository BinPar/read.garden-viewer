import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';
import { zoom, leftCorrector, topCorrector } from './interpolationValues';

const updateZoom = (newZoomValue: number, state: State): void => {
  if (state.layout === LayoutTypes.Fixed) {
    const previousZoom = zoom.target;
    zoom.target = newZoomValue;
    zoom.target = Math.min(Math.max(zoom.target, state.minimumZoomValue), state.maximumZoomValue);
    const zoomDelta = zoom.target - previousZoom;
    const leftCorrection = (window.innerWidth / 2) * zoomDelta;
    const topCorrection = (window.innerHeight / 2) * zoomDelta;
    leftCorrector.target -= leftCorrection;
    topCorrector.target -= topCorrection;
    // console.log({
    //   previousZoom,
    //   zoom: {
    //     ...zoom,
    //   },
    //   leftCorrector: {
    //     ...leftCorrector,
    //   },
    //   topCorrector: {
    //     ...topCorrector,
    //   },
    // });
  }
};

export default updateZoom;
