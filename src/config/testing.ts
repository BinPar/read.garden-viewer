import { APIInterface, DispatchAPIAction } from '../model/apiInterface';
import { InitialConfig } from '../model/config';
import { ReadGardenEventHandler } from '../model/events';
import { State } from '../model/state';
import { ViewerFunction } from '../model/viewer';
import settings from './settings/settings.json';

export interface TestingConfig {
  baseURL: string;
  longFlowLayoutContentConfig: InitialConfig;
}

const testingConfig: TestingConfig = {
  ...settings,
  longFlowLayoutContentConfig: {
    layoutType: 'flow',
    contentSlug: 'acuario',
    startPageLabel: '64',
    initialFontFamily: 'Obf-Helvetica',
  }
};

declare global {
  interface Window {
    readGardenViewer: ViewerFunction;
    readGardenApi: APIInterface;
    readGardenSetDispatcher: (newDispatcher: DispatchAPIAction) => void;
    readGardenEventHandler: ReadGardenEventHandler;
    readGardenSetState: (newState: State) => void;
  }
}

export default testingConfig;