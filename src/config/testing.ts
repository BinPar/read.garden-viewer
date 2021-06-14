import { DispatchAPIAction } from '../model/actions/common';
import { InitialConfig } from '../model/config';
import { ReadGardenEventHandler } from '../model/events';
import { State } from '../model/state';
import { APIInterface, ViewerFunction } from '../model/viewer';
import settings from './settings/settings.json';

export interface TestingConfig {
  isDev: boolean;
  baseURL: string;
  cdnDomain: string;
  longFlowLayoutContentConfig: InitialConfig;
}

const testingConfig: TestingConfig = {
  ...settings,
  longFlowLayoutContentConfig: {
    layoutType: 'flow',
    slug: 'acuario',
    contentSlug: '64',
    initialFontFamily: 'Obf-Helvetica',
    availableFontFamilies: ['Obf-Helvetica', 'Obf-OpenDyslexic', 'Obf-AmericanTypewriter', 'Obf-RobotoSlab', 'Obf-Baskerville', 'Obf-Tahoma', 'Obf-TimesNewRoman'],
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