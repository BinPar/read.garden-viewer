import log from 'loglevel';
import { ViewerFunction } from './model/viewer';
import viewer from './viewer';

log.setLevel('info');

declare global {
  interface Window {
    readGardenViewer: ViewerFunction;
  }
}

window.readGardenViewer = viewer;
