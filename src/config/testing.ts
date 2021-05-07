import { APIInterface, DispatchAPIAction } from "../model/apiInterface";
import { InitialConfig } from "../model/config";
import { ReadGardenEventHandler } from "../model/events";
import { State } from "../model/state";
import { ViewerFunction } from "../model/viewer";

export interface TestingConfig {
  baseURL: string;
  longFlowLayoutContentConfig: InitialConfig;
}

const testingConfig: TestingConfig ={
  baseURL: process.env.BASEURL || 'http://localhost:3000/',
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