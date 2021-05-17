import { Coordinates } from '../../model/highlights';
// import { State } from '../../model/state';

/**
 * Translates client coordinates to main node coordinates
 * recalculating the zoom and scroll deformations
 * @param {Coordinates} client Client coordinates
 * @returns Zoom Panel coordinates
 */
const clientToZoomPanelCoordinates = (client: Coordinates): Coordinates => client;

export default clientToZoomPanelCoordinates;
