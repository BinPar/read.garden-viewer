import log from 'loglevel';
import viewer from './viewer';

log.setLevel('info');
(window as any).readGardenViewer = viewer;