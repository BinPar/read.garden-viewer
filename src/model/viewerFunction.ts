import { APIInterface } from "./apiInterface";
import { InitialConfig } from "./config";

export type ViewerFunction = (config: InitialConfig) => APIInterface;
